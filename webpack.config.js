module.exports = (env, options) => ({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src/"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
});
