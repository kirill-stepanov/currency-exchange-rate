/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const { getDefaultConfig } = require("@react-native/metro-config");
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.extraNodeModules = {
    "~": path.resolve(__dirname, "src"),
  };
  return config;
})();
