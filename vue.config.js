const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 关闭语法检查
    lintOnSave: false,
    // 代理服务器
    devServer: {
        proxy: {
            '/api': {
                // 以 /api 开头的路径，将被代理到target
                target: 'http://127.0.0.1:5056',
                // target: 'https://czt666.cn:5056',
                changeOrigin: true
            },
        }
    },
    // build 之后的根路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})

