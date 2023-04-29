/** https://webpack.js.org/configuration/ */

import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import WebpackObfuscator from "webpack-obfuscator";
import { InjectManifest } from "workbox-webpack-plugin";

import project from "./package.json";
import { Config } from "./src/server/helpers/config";

export default {
	mode: Config.IS_PROD ? "production" : "development",
	entry: {
		main: path.resolve(__dirname, "src/client/app/index.tsx")
	},
	devtool: Config.IS_PROD ? false : "inline-source-map",
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/i,
				include: [path.resolve(__dirname, "src/client"), path.resolve(__dirname, "src/shared")],
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [["@babel/preset-env", { debug: !Config.IS_PROD }]],
							plugins: ["@babel/plugin-transform-runtime"],
							targets: "defaults"
						}
					},
					{ loader: "ts-loader" }
				]
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, "src/client"),
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp|ttf)$/i,
				include: path.resolve(__dirname, "src/client"),
				type: "asset/resource"
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "build/client"),
		publicPath: "./",
		filename: "[name].bundle.js",
		assetModuleFilename: "assets/[name][ext]",
		sourceMapFilename: "[name].js.map",
		clean: true
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			"socket.io-client": path.resolve(__dirname, "node_modules/socket.io-client/dist/socket.io.js"),
			"@app": path.resolve(__dirname, "src/client/app"),
			"@components": path.resolve(__dirname, "src/client/app/components"),
			"@hooks": path.resolve(__dirname, "src/client/app/hooks"),
			"@pages": path.resolve(__dirname, "src/client/app/pages"),
			"@shared": path.resolve(__dirname, "src/shared"),
			"@types": path.resolve(__dirname, "src/client/app/types")
		}
	},
	target: ["web", "es5"],
	optimization: {
		minimize: Config.IS_PROD,
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
					priority: 10
				}
			}
		}
	},
	plugins: [
		new InjectManifest({
			swSrc: path.resolve(__dirname, "src/client/sw.ts"),
			maximumFileSizeToCacheInBytes: 5000000
		}),

		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/client"),
					to: path.resolve(__dirname, "build/client"),
					toType: "dir",
					globOptions: {
						ignore: [
							"**/*.ts",
							"**/tsconfig.json",
							"**/*.html",
							"**/css/**/*",
							"**/font/**/*",
							"**/img/**/*"
						]
					}
				},
				{
					from: path.resolve(__dirname, "src/client/img/icons"),
					to: path.resolve(__dirname, "build/client/icons"),
					toType: "dir"
				}
			]
		}),

		new HtmlWebpackPlugin({
			title: project.name,
			description: project.description,
			author: project.author,
			filename: "index.html",
			template: path.resolve(__dirname, "src/client/_index.html")
		}),

		Config.IS_PROD &&
			new WebpackObfuscator(
				{
					compact: true,
					disableConsoleOutput: true,
					identifierNamesGenerator: "hexadecimal",
					log: false,
					numbersToExpressions: true,
					renameGlobals: false,
					selfDefending: true,
					simplify: true,
					splitStrings: true,
					splitStringsChunkLength: 2,
					stringArray: true,
					stringArrayCallsTransform: true,
					stringArrayEncoding: ["rc4"],
					stringArrayIndexShift: true,
					stringArrayRotate: true,
					stringArrayShuffle: true,
					stringArrayWrappersCount: 5,
					stringArrayWrappersChainedCalls: true,
					stringArrayWrappersParametersMaxCount: 5,
					stringArrayWrappersType: "function",
					stringArrayThreshold: 1,
					transformObjectKeys: true,
					unicodeEscapeSequence: false
				},
				["sw.js"]
			)
	].filter(n => n)
} as Configuration;
