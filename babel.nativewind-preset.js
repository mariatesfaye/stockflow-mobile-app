/**
 * NativeWind v4 re-exports `react-native-css-interop/babel`, which always adds
 * `react-native-worklets/plugin` for Reanimated 4+. Expo SDK 53 ships Reanimated 3
 * on React Native 0.79 — that package is not present / mismatched.
 *
 * This preset mirrors the interop Babel setup but omits the worklets plugin.
 * Reanimated 3's plugin is still applied by `babel-preset-expo` when
 * `react-native-reanimated` is installed.
 */
module.exports = function () {
  return {
    plugins: [
      require("react-native-css-interop/dist/babel-plugin").default,
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
          importSource: "react-native-css-interop",
        },
      ],
    ],
  };
};
