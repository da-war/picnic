module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
       'module-resolver',
       {
         root: ['./'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           "@src":"./src",
           "@assets": "./src/assets",
           "@components": "./src/components",
           "@redux": "./src/redux",
           "@screens": "./src/screens",
           "@api": "./src/api",
         }
       }
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env', // Path to your .env file
      },
    ],

  ]
};
