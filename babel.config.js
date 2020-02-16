module.exports = {
  'presets': ["module:metro-react-native-babel-preset",
  'module:react-native-dotenv',
  ],
  'sourceMaps': true,
  'plugins': [
    '@babel/transform-flow-strip-types',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/transform-runtime',
  ],
  
}
