const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'assets', 'js')//destino do bundle
  },
  devtool: 'source-map', //gera um arquivo de mapa de origem pra facilitar o debug(saber onde o erro ocorreu)
  module: {
    rules: [// regras de processamento de arquivos
      {
        test: /\.js$/,// verifica se o arquivo é um .js
        exclude: /node_modules/,
        use: {// usa o babel-loader para transpilar o código para navegadores mais antigos
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }
    ]
  }
};
