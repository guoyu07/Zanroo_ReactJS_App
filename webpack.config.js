var config = {
   entry: './script.jsx',
	
   output: {
      path:'/',
      filename: 'script.js',
   },
	
   devServer: {
      inline: true,
      port: 9090
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;