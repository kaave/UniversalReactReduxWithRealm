import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';

const rootPath = path.join(__dirname, '..', '..', '..');

const externals = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((tempMods, mod) => {
    tempMods[mod] = `commonjs ${mod}`;
    return tempMods;
  }, {} as { [key: string]: string });

export default {
  context: process.cwd(),
  devtool: 'inline-source-map',
  entry: path.join(rootPath, 'source', 'server', 'entry.ts'),
  output: {
    path: path.join(rootPath, 'build'),
    filename: 'server.js',
  },
  target: 'node',
  cache: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // localIdentName: '[name]__[local]--[hash:base64:5]',
              // modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals,
  plugins: [
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
    new webpack.LoaderOptionsPlugin({ debug: false }),
  ],
};
