const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devMode = true;

module.exports = {
    mode: devMode? 'development' : 'production',
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        filename: 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[name][ext]'
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: false,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {   
                test: /\.(sa|sc|c)ss$/i,
                use: [
                  devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|webp|avif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        // new BundleAnalyzerPlugin()
    ]
}
