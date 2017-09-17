import * as webpack from 'webpack';
import * as BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import * as path from 'path';

const rootPath = path.join(__dirname, '..', '..', '..');

export default {
  context: process.cwd(),
  devtool: 'inline-source-map',
  entry: {
    index: './source/entry_points/client.jsx',
    signin: './source/entry_points/signin.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(rootPath, 'build'),
    publicPath: '/',
  },
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
          'style-loader',
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
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: '3000',
        files: ['source/views/**/*.ejs'],
        proxy: 'http://localhost:13000',
      },
      {
        reload: false,
      },
    ),
  ],
};

