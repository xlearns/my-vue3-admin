module.exports = {
  // 我们在构建项目的时候，通过webpack会把css文件的内容传送给postcss-loader， postcss-loader会解析postcss.config中的插件传输给 Postcss，Postcss 会解析传入的css，将其转换为一个AST，然后通过各种不同的插件来对这个AST进行操作，最终序列化新的 css，最后将结果返回到 postcss-loader，进行 webpack 下一个 loader 的操作
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  },
}