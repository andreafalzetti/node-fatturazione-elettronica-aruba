module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  verbose: false,
  transformIgnorePatterns: ['/node_modules/(?!axios)/'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
