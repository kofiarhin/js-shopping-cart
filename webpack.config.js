const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },

    devServer: {
        contentBase: "dist"
    },

    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),

        new htmlWebpackPlugin({
            filename: "shop.html",
            template: './src/shop.html'
        }),

        new htmlWebpackPlugin({
            filename: "cart.html",
            template: './src/cart.html'
        }),
        new htmlWebpackPlugin({
            filename: "viewItem.html",
            template: './src/viewItem.html'
        }),

        new htmlWebpackPlugin({
            filename: "search.html",
            template: "./src/search.html"
        }),


        new htmlWebpackPlugin({
            filename: "success.html",
            template: "./src/success.html"
        })
    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.json$/,
                use: [
                    "json-loader"
                ]
            }
        ]
    }

}