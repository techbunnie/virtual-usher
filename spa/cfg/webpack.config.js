import * as path from "node:path";
import * as url from "node:url";

import "webpack-dev-server";
import CopyPlugin from "copy-webpack-plugin";


const rootDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const config = {
    mode: "development",

    context: rootDir,
    entry: {
        index: path.join(rootDir, "src", "index.tsx"),
    },
    output: {
        path: path.join(rootDir, "build"),
        clean: true,
        filename: "js/[name].bundle.js",
    },
    optimization: {
        minimize: false,
    },

    resolve: {
        alias: {
            "@alfred": path.resolve(rootDir, "src"),
        }
    },

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                loader: "esbuild-loader",
                exclude: /node_modules/,
                options: {
                    loader: "jsx",
                    tsconfig: path.join(rootDir, "tsconfig.json"),
                }
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    context: path.join(rootDir, "public"),
                    from: "*.html",
                }
            ]
        })
    ],

    devServer: {
        static: path.resolve(rootDir, "build"),
        allowedHosts: "all",
        server: "https",
        host: "localhost",
        port: 8000,
        historyApiFallback: true,
    },
};

export default config;
