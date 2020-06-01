import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const rootPath = path.resolve(__dirname, '../');

const configBaseDev: webpack.Configuration = {
    mode: 'development',
    entry: {
        index: './src/index.ts'
    },
    target: 'web',
    devtool: 'source-map',
    output: {
        path: path.resolve(rootPath, 'dist/dev'),
        filename: '[name].js',
        publicPath: 'http://localhost:8123/' // To activate for devServer
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.html', '.scss'], // The resolving order
        alias: {
            '@styles': path.resolve(rootPath, 'src/scss/')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'./src/index.html',
            inject: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    }/*'style-loader'*/, 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        public: 'localhost:8123',
        publicPath: 'http://localhost:8123/',
        contentBase: path.resolve(rootPath, 'dist/dev'),
        host: '0.0.0.0',
        port: 8123,
        hot: true,
        inline: true,
        open: 'chrome'
    }
};

module.exports = configBaseDev;
