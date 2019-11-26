const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin')

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const extractCSS = new ExtractTextPlugin({
  allChunks: true,
  filename: 'stylesheet.css'
});

const plugins = [
    extractCSS,
    new webpack.DefinePlugin({
       "process.env": {
         IS_BROWSER: "true"
       }
     }),
    new HTMLWebpackPlugin({
        title: 'Elite Archery',
        template: path.resolve(__dirname, 'src/client/index.ejs'),
        hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
      // uglifyOptions: {
      //   mangle: false,
      //   ie8: true,
      //   keep_classnames: true,
      //   keep_fnames: true,
      //   safari10: true
      // }
    }),
    new CompressionPlugin({
     asset: "[path].gz[query]",
     algorithm: "gzip",
     test: /\.eot$|\.ttf$|\.svg$|\.js$|\.css$|\.html$/,
     threshold: 10240,
     minRatio: 0.8
    }),
];


module.exports = {
    context: srcPath,
    target: 'web',
    entry: {
        client: `${srcPath}/client/index.js`,
        vendor: ['axios', 'lodash', 'react', 'react-dom', 'react-router-dom', 'redux', 'redux-saga', 'react-redux', 'gsap', 'react-google-maps', 'three', 'video.js', 'moment'],
    },
    output: {
        path: distPath,
        filename: '[name].js',
        publicPath: '/assets/',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json'],
    },
    stats: {
      errors: true,
      errorDetails: true,
      warnings: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { compact: false },
            },
            {
              test: /\.worker\.js$/,
              use: {
                loader: 'worker-loader',
                options: { fallback: true }
               }
            },
            {
              test: /\.css$/,
              use: extractCSS.extract({
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      publicPath: '/assets/'
                    }
                  },
                  { loader: 'postcss-loader'}
                ]
              })
            },
            {
              test: /\.(png|jpg|gif)$/,
              use: 'file-loader'
            },
            {
              test: /\.json$/,
              loader: 'json-loader'
            },
            {
              test: /\.(woff|woff2|ttf|eot|svg)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 50000,
                  publicPath: '/assets/'
                }
              }
            }
        ],
    },
    plugins,
    devtool: 'source-map',
};
