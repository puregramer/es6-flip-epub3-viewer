/***
 * file name : webpack.config.js
 * description : project Paper webpack config
 * create date : 2018-06-28
 * creator : saltgamer
 ***/

const path = require('path');

module.exports = {
    mode: 'production', // "production" | "development" | "none"
    entry: ['babel-polyfill', 'whatwg-fetch', './src/js/main.js'],
  /*  entry: {
        main: './src/js/main.js',
        archive: './src/js/archive.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },*/
    output: {
        filename: './js/projectPaper.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        openPage: 'projectPaper.html',
        port: 7777
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['last 2 versions']
                                }
                            }]
                        ],
                        // plugins: ['transform-remove-console']
                    }
                }
            }
        ]
    },
    optimization: {},
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.json', '.css']
    }
};