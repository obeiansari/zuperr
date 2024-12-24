import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import ESLintPlugin from 'eslint-webpack-plugin';

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: process.env.PORT || 8080,
        host: '0.0.0.0',
        historyApiFallback: true,
        compress: true, // Compress the API call
        hot: true,
        // proxy: {
        //     path: '/api/*',
        //     target: 'http://localhost:9090'
        // }
        proxy: [
            {
                context: ['/api', '/auth'],
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            // {
            //     context: ['/images', '/media'],
            //     target: 'http://localhost:6000',
            //     changeOrigin: true,
            // },
        ],
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new ESLintPlugin({
            configType:'flat',
            extensions: ['js', 'jsx', 'ts', 'tsx'],
            fix: true,
            emitError: true,
            failOnError: true,
        }),
    ],
};

export default merge(commonConfig, devConfig);
