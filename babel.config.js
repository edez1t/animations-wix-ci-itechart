module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.json', '.js', '.ts', '.tsx', '.ios.tsx', '.android.tsx'],
        alias: {
          lib: './lib',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
