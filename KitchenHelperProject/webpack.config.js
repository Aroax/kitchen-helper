var path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
     },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                // use: [{
                //   loader: 'babel-loader',
                //   options: {
                //       presets: ["@babel/preset-env", "@babel/preset-react"]
                //   }
                // }],
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
