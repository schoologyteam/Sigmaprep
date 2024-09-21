export default {
  testEnvironment: 'node', // or 'jsdom' if testing browser code
  roots: ['<rootDir>/tests/unit'], // Specify the location where your tests are
  transform: {},
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use babel-jest to handle ES module transformation
  },
};
