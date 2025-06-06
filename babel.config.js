module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      ['react-native-worklets-core/plugin',
        {
          processNestedWorklets: true,
        }
      ],
    ],
    
  };
};
