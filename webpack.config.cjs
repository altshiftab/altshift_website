const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {SubresourceIntegrityPlugin} = require("webpack-subresource-integrity");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    mode: 'production',
    entry: {
        about: './src/scripts/about.ts',
        contact: './src/scripts/contact.ts',
        index: './src/scripts/index.ts',
        services: './src/scripts/services.ts',
    },
    output: {
        filename: 'scripts/[name]-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: true,
            },
            extractComments: false,
        })],
        splitChunks: {
            chunks: 'all',
        },
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            lit: 'lit',
            litDecorators: 'lit/decorators.js',
            altshiftBox: path.resolve(__dirname, 'node_modules/@altshiftab/web_components/dist/box.js'),
            altshiftSwitch: path.resolve(__dirname, 'node_modules/@altshiftab/web_components/dist/switch.js')
        }
    },
    plugins: [
        new Webpack.ProvidePlugin({
            lit: 'lit',
            litDecorators: "lit/decorators.js",
            altshiftBox: "@altshiftab/web_components/box",
            altshiftSwitch: "@altshiftab/web_components/switch"
        }),
        new CleanWebpackPlugin(),
        new Webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            filename: 'about.html',
            chunks: ['about'],
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            chunks: ['contact'],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: './src/services.html',
            filename: 'services.html',
            chunks: ['services'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/images', to: 'images' },
            ]
        }),
        new SubresourceIntegrityPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: {
                                filter: (url, resourcePath) => {
                                    return url !== '/images/me.avif';
                                },
                            }
                        },
                    },
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|avif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "@altshiftab/minify_lit"
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    targets: ["last 2 versions", "not dead"]
                                }],
                                "@babel/preset-typescript"
                            ],
                            "plugins": [
                                "@babel/plugin-transform-class-static-block",
                                "@babel/plugin-transform-private-methods"
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
                    }
                ]
            },
        ]
    }
};
