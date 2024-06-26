// 进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";
import Vue from "vue";

// 获取baseURL
let baseURL = process.env.VUE_APP_DEBUG_BASE_API
const hostname = window.location.hostname.split(':')[0]
if (hostname === "gptgptgpt.cn") {
    baseURL = process.env.VUE_APP_GPT_BASE_API
} else if (hostname === "czt666.cn") {
    baseURL = process.env.VUE_APP_CZT_BASE_API
}

const request = axios.create({
    baseURL,
    timeout: 120000,
});

// 请求拦截器 
request.interceptors.request.use((config) => {
    // 在这里 配置请求头
    let token = window.localStorage.getItem(Vue.prototype.$config.TOKEN_KEY);
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.Authorization = token;
    }

    nprogress.start();
    return config;
});

// 响应拦截器
request.interceptors.response.use(
    (res) => {
        // 响应 成功的回调

        nprogress.done();
        let result = res.data;

        // console.log(res.headers);
        if (res.headers.token) {
            localStorage.setItem(Vue.prototype.$config.TOKEN_KEY, res.headers.token);
        }

        return result;
    },
    (error) => {
        // 响应 失败的回调
        return Promise.reject(new Error("响应错误"));
    }
);

export default request;
