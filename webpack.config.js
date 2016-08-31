import Webpack from 'webpack';
import path from 'path';

const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'client.js');

const config = {
  devtool:'eval',
  entry: [
    //hot style updates
    'webpack/hot/dev-server',

    //server refresh
    'webpack-dev-server/client?http://localhost:8080',
    mainPath
  ],
  output: {
    path:buildPath,
    filename:'bundle.js',
    publicPath:'/build'
  },
  module: {
    loaders: [
      {
        test:/\.js$/,
        loader:'babel',
        exclude:[nodeModulesDir]
      }
    ],
    plugins: [new Webpack.HotModuleReplacementPlugin()]
  }
}
