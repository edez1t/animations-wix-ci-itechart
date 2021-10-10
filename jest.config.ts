import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'react-native',
    setupFilesAfterEnv: ['./node_modules/react-native-gesture-handler/jestSetup.js', './lib/tests/setupJest.ts'],
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    transformIgnorePatterns: [
      '/node_modules/(?!react-native-reanimated|react-native-gesture-handler|@react-native|react-native)',
    ],
  }
}
