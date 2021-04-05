const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devtool: 'eval-cheap-module-source-map',
	entry: './src/index.tsx',
	devServer: {
		port: 6208,
		contentBase: path.join(__dirname, 'dist'),
	},
	node: {
		fs: 'empty',
	},
	resolve: {
		extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			inject: true,
		}),
	],
}
