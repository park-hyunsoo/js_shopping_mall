const path = require('path'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = { 
  entry: ['./src/js/index.js', './src/sass/main.scss'], 

  output: { 
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js' 
  }, 
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }) 
  ],   
  module: { 
    rules: [ 
      { 
        test: /\.scss$/, 
        use: [ 
            MiniCssExtractPlugin.loader, 
            "css-loader",    
            "sass-loader"    
        ], 
        exclude: /node_modules/ 
      } 
    ] 
  }, 
  devtool: 'source-map', 
  mode: 'production' 
};