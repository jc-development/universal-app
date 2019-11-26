const nodeExternals = require('webpack-node-externals');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
    context: srcPath,
    entry: './server/index.js',
    output: {
        path: distPath,
        filename: 'server.js',
        publicPath: '/assets/',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['env', {
                            targets: {
                                node: 8,
                            },
                        }],
                    ],
                },
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
              use: [
                {
                  loader: 'css-loader'
                }
              ]
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
    externals: nodeExternals(),
};
