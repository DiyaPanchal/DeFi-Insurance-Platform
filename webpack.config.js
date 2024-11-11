const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv()],
  devtool: "source-map", // Adjust according to your needs
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: ["source-map-loader"],
      },
    ],
  },
};

// now no need to import the env module everytime simply use like thits REACT_APP_ALCHEMY_API_KEY