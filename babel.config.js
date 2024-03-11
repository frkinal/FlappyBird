module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['.'],
        alias: {
          '@components': './src/components/index.ts',
          '@components/types': './src/components/types/index.ts',
          // '@screens': './src/screens/index.ts',
          // '@navigators': './src/navigators/index.ts',
          '@utils': './src/utils/index.ts',
        },
      },
    ],
  ],
};
