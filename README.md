# Taller 6 – Clean Architecture (Angular + Node.js + Spring Boot)

**Unidad Central del Valle del Cauca – Facultad de Ingeniería – Arquitectura de Software**
Docente: Jesus David Mejia Vergara

Aplicación con tres módulos funcionales —**Usuarios**, **Productos** y **Cursos**— implementada con
*Clean Architecture* en tres proyectos que comparten el mismo contrato de datos:

| Proyecto | Carpeta | Puerto | Documentación |
|---|---|---|---|
| Frontend Angular 20 | [`frontend-angular`](frontend-angular) | `4200` | Compodoc (`npm run compodoc`) |
| Backend Node.js (Express 5 + TypeScript) | [`backend-nodejs`](backend-nodejs) | `3000` | Swagger: <http://localhost:3000/api/docs> |
| Backend Spring Boot 4 (Java) | [`backend-springboot`](backend-springboot) | `8080` | Swagger: <http://localhost:8080/api/swagger-ui/index.html> |

> Documentación técnica de los backends: [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md)

## Integrantes

<!-- Completar con los 2 a 4 integrantes del grupo -->
- Nombre Apellido – código
- Nombre Apellido – código

## Requisitos

- Node.js 20+ y npm (probado con Node 22)
- JDK 25 (el `build.gradle` lo exige mediante *toolchain*; Gradle puede descargarlo automáticamente)
- No hace falta instalar Gradle: se usa el wrapper (`gradlew`)

## Cómo ejecutar

### 1. Backend Node.js
```bash
cd backend-nodejs
npm install
npm run start          # http://localhost:3000
```

### 2. Backend Spring Boot
```bash
cd backend-springboot
./gradlew bootRun      # Windows: gradlew.bat bootRun  →  http://localhost:8080/api
```

### 3. Frontend Angular
```bash
cd frontend-angular
npm install
npm run start          # http://localhost:4200
```

### Endpoints (idénticos en ambos backends)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/users/{countUsers}` | Lista de usuarios simulados |
| GET | `/api/products/{countProducts}` | Lista de productos simulados |
| GET | `/api/courses/{countCourses}` | Lista de cursos simulados |

Un parámetro que no sea entero positivo responde `400`.

## Cambiar de backend desde Angular (Providers)

El único archivo que decide de dónde salen los datos es
[`frontend-angular/src/app/app.config.ts`](frontend-angular/src/app/app.config.ts).
Se deja activo **un** bloque de providers y los demás comentados:

```ts
providers: [
  // Local (datos con Faker, sin backend)
  { provide: UserRepository,    useClass: UserLocalRepositoryImpl },
  { provide: ProductRepository, useClass: ProductLocalRepositoryImpl },
  { provide: CourseRepository,  useClass: CourseLocalRepositoryImpl },

  // Node.js  → descomentar estas 3 líneas y comentar el bloque Local
  // { provide: UserRepository,    useClass: UserNodeRepositoryImpl },
  // { provide: ProductRepository, useClass: ProductNodeRepositoryImpl },
  // { provide: CourseRepository,  useClass: CourseNodeRepositoryImpl },

  // Spring Boot → descomentar estas 3 líneas y comentar el bloque anterior
  // { provide: UserRepository,    useClass: UserSpringBootRepositoryImpl },
  // { provide: ProductRepository, useClass: ProductSpringBootRepositoryImpl },
  // { provide: CourseRepository,  useClass: CourseSpringBootRepositoryImpl },
]
```

Los **casos de uso y los componentes no se modifican**: dependen del contrato abstracto
(`UserRepository`, `ProductRepository`, `CourseRepository`), nunca de una implementación.
Las URLs de los backends están en `frontend-angular/src/environments/environment.ts`.

## Verificar que ambos backends respetan el contrato

Con un backend levantado:

```bash
node scripts/verify-contract.mjs http://localhost:3000/api   # Node.js
node scripts/verify-contract.mjs http://localhost:8080/api   # Spring Boot
```

Comprueba estado HTTP, cantidad de elementos, nombres de campos, tipos y valores permitidos
(enums) de los tres módulos, y el `400` ante parámetros inválidos.

## Pruebas, cobertura y documentación (Angular)

```bash
cd frontend-angular
npm test               # Jest; falla si la cobertura global baja del 90 %
npm run compodoc       # genera ./documentation (abrir documentation/index.html)
```

Estado actual: **23 suites, 97 pruebas, 100 % de cobertura** (sentencias, ramas, funciones y líneas),
medida sobre todo `src/app` excepto specs y mocks. El umbral del 90 % está forzado en `jest.config.js`.

## Estándar de commits

Se usa [Conventional Commits](https://www.conventionalcommits.org/es/):
`feat:` (funcionalidad), `fix:` (corrección), `test:` (pruebas), `docs:` (documentación),
`chore:` (mantenimiento), con alcance opcional: `feat(nodejs): ...`, `fix(angular): ...`.

## Cambios respecto a los repositorios base

| Área | Cambio | Motivo |
|---|---|---|
| Todos | Nuevo módulo **Cursos** completo en las tres capas | Requisito: tres módulos funcionales |
| Angular | `jest.config.js` / `tsconfig.spec.json`: transformar `@faker-js/faker` y medir cobertura sobre todo el código con umbral 90 % | En el repo base **6 de 15 suites fallaban** (faker v10 es solo ESM) y el reporte de cobertura ignoraba los archivos que no cargaban |
| Angular | `angular.json`: presupuesto de bundle 1.5 MB / 2 MB | El repo base ya superaba el límite de 1 MB y `ng build` terminaba con error |
| Angular | Specs de `app.routes` y `app.config` | Eran los dos archivos sin cobertura |
| Node.js | Controladores responden `200` (antes `201`) y validan el parámetro (`400`) | Alinear el código con lo que ya documentaba Swagger |
| Spring Boot | `springdoc-openapi` 2.5.0 → **3.0.0** | La rama 2.x es para Spring Boot 3; Spring Boot 4 requiere springdoc 3.x |
| Spring Boot | Anotaciones Swagger (`@Tag`, `@Operation`), `OpenApiConfig` y validación `400` | Documentar las APIs con Swagger y paridad de contrato con Node |
| READMEs | URL de Swagger de Spring Boot corregida a `:8080` | Figuraba `:3000` |
