module.exports = {
  devServer: {
    proxy: {
      '/h5': {
        target: 'https://acs.m.taopiaopiao.com',
        // ws: true,
        changeOrigin: true
      },
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      }
    }
  }
}
