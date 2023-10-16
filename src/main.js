import Vue from "vue";
import App from "./App.vue";

// vuex
import store from "./store/index";
// vue-router
import VueRouter from "vue-router";
import router from "./router";

import "element-ui/lib/theme-chalk/index.css";
import {Message, Switch, Checkbox} from "element-ui";

Vue.use(Switch);
Vue.use(Checkbox);
Vue.prototype.$message = Message;

// 新滚动条
import vuescroll from "vuescroll";

Vue.use(vuescroll, {
    ops: {
        bar: {
            background: "#c1c1c1",
        },
    },
});

// 全局函数
import BaseFun from "./base";
// 全局外部连接
import ConfigPlugin from "./base/config";

Vue.use(ConfigPlugin);

Vue.config.productionTip = false;

Vue.use(BaseFun);
Vue.use(VueRouter);

// 计算rem基准值
// function calculateRem() {
//     const html = document.querySelector("html");
//     const width = html.getBoundingClientRect().width;
//     html.style.fontSize = `${width / 10}px`;
// }
//
// calculateRem();
// window.addEventListener("resize", calculateRem);

new Vue({
    store,
    router,
    render: (h) => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
}).$mount("#app");
