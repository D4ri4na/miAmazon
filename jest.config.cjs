module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  // Esta línea es la magia que evita que Jest falle por el enlace https de Supabase
  moduleNameMapper: {
    '^https://(.*)$': '<rootDir>/tests/mockUrl.js'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js'
  ]
};