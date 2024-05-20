module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/tests/**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
