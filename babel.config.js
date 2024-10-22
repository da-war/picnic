module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
       'module-resolver',
       {
         root: ['./'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           "@src": "./src",
           "@assets": "./src/assets",
           "@components": "./src/components",
           "@redux": "./src/redux",
           "@screens": "./src/screens",
            
         }
       }
    ]
  ]
};
