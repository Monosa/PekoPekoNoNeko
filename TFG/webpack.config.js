const autoprefixer = require('autoprefixer');
const path = require("path");
module.exports = [{
    entry: './app.scss',
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: 'style-bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'bundle.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                   plugins: () => [autoprefixer()]
                }
              },
            { loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules']
              }
            } },
          ]
        }
      ]
    },
  }];