module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageReporters: ["html", "json", "lcov", "text", "clover"],

  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
  ],

  // @faker-js/faker v10 se distribuye solo como ESM; Jest debe transformarlo.
  transformIgnorePatterns: ['node_modules/(?!(@faker-js|.*\\.mjs$))'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' },
    ],
  },

  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,

  // Se mide TODO el código fuente (no solo los archivos que alcanzan a cargarse),
  // excluyendo archivos de arranque, mocks y specs.
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/mocks/**',
  ],
  // El taller exige cobertura superior al 90 %: Jest falla si no se cumple.
  coverageThreshold: {
    global: { statements: 90, branches: 90, functions: 90, lines: 90 },
  },

  clearMocks: true,
  testMatch: ["**/*.spec.ts"],
  rootDir: './'
};
