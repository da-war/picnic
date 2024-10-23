module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom', // This should point to jsdom
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Adjust if you have a setup file
};
