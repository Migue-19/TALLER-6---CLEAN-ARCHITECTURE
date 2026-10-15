#!/usr/bin/env node
/**
 * Verificador de contrato de las APIs.
 *
 * Comprueba que un backend (Node.js o Spring Boot) responda con la misma
 * estructura de datos que esperan los modelos de Angular
 * (frontend-angular/src/app/core/domain/models).
 *
 * Uso:
 *   node scripts/verify-contract.mjs http://localhost:3000/api   # Node.js
 *   node scripts/verify-contract.mjs http://localhost:8080/api   # Spring Boot
 *
 * No requiere dependencias (usa fetch nativo, Node >= 18).
 */

const baseUrl = (process.argv[2] ?? 'http://localhost:3000/api').replace(/\/$/, '');
const COUNT = 5;

/** Contrato: nombre de campo -> validador. Debe coincidir con los modelos de Angular. */
const isInt = (v) => Number.isInteger(v);
const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
const isStr = (v) => typeof v === 'string' && v.length > 0;
const oneOf = (...values) => (v) => values.includes(v);

const CONTRACTS = {
  users: {
    id: isInt, name: isStr, lastName: isStr, age: isInt, email: isStr,
    engineering: oneOf('Sistemas', 'Electronica', 'Biomedica', 'Industrial', 'Ambiental'),
  },
  products: {
    id: isInt, name: isStr, category: oneOf('Lacteos', 'Carnes', 'Frutas', 'Verduras'), price: isNum,
  },
  courses: {
    id: isInt, name: isStr, teacher: isStr, credits: isInt,
    modality: oneOf('Presencial', 'Virtual', 'Hibrido'),
  },
};

let failures = 0;
const ok = (msg) => console.log(`  ✔ ${msg}`);
const fail = (msg) => { failures++; console.log(`  ✘ ${msg}`); };

async function checkModule(name, contract) {
  console.log(`\n[${name}] GET ${baseUrl}/${name}/${COUNT}`);
  const res = await fetch(`${baseUrl}/${name}/${COUNT}`);
  res.status === 200 ? ok('HTTP 200') : fail(`HTTP ${res.status} (se esperaba 200)`);

  const body = await res.json();
  if (!Array.isArray(body)) return fail('la respuesta no es un arreglo');
  body.length === COUNT ? ok(`devuelve ${COUNT} elementos`) : fail(`devuelve ${body.length} elementos (se esperaban ${COUNT})`);

  const expectedKeys = Object.keys(contract).sort().join(',');
  let shapeOk = true;
  body.forEach((item, i) => {
    const keys = Object.keys(item).sort().join(',');
    if (keys !== expectedKeys) { shapeOk = false; fail(`item ${i}: campos [${keys}] != esperados [${expectedKeys}]`); return; }
    for (const [field, validate] of Object.entries(contract)) {
      if (!validate(item[field])) { shapeOk = false; fail(`item ${i}: valor inválido en "${field}": ${JSON.stringify(item[field])}`); }
    }
  });
  if (shapeOk) ok(`estructura y tipos correctos (${expectedKeys})`);

  const bad = await fetch(`${baseUrl}/${name}/0`);
  bad.status === 400 ? ok('HTTP 400 con parámetro inválido (0)') : fail(`HTTP ${bad.status} con parámetro 0 (se esperaba 400)`);
}

console.log(`Verificando contrato contra: ${baseUrl}`);
try {
  for (const [name, contract] of Object.entries(CONTRACTS)) await checkModule(name, contract);
} catch (e) {
  console.error(`\nNo se pudo conectar con ${baseUrl}: ${e.message}`);
  process.exit(2);
}
console.log(failures === 0 ? '\n✅ El backend cumple el contrato.' : `\n❌ ${failures} incumplimiento(s) del contrato.`);
process.exit(failures === 0 ? 0 : 1);
