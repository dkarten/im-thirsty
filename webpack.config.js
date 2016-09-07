import Webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'client.js');

const config = {
  devtool:'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    mainPath
  ],
  output: {
    path:buildPath,
    filename:'bundle.js',
    publicPath:'/build'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'app/index.tpl.html',
      inject:'body',
      filename:'index.html'
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {
        test:/\.js$/,
        loader:'babel',
        exclude:[nodeModulesDir]
      }
    ],
  },
  _hotPort:3000
}

export default config;
