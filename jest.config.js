module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./node_modules/react-native-gesture-handler/jestSetup.js', './src/tests/setupJest.ts'],
  moduleFileExtensions: ['ts', 'tsx'],
}
