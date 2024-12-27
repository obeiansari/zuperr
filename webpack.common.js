import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

// const isMock = process.env.NODE_ENV === 'mock';
const __dirname = new URL('.', import.meta.url).pathname;
export default {
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'assets/js/[name].[fullhash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@base': path.resolve(__dirname, 'src/base'),
            '@components/ui': path.resolve(__dirname, 'src/components/ui'),
            '@base-components': path.resolve(__dirname, 'src/base-components'),
            '@src': path.resolve(__dirname, 'src/'),
            '@lib': path.resolve(__dirname, 'lib/')
        },
    },
    cache: false, 
    optimization: {
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         IS_MOCK: isMock,
        //     },
        // }),
        new ESLintPlugin({
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        }),
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
        }),
    ],
};
