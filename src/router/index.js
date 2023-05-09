import Vue from "vue";
import VueRouter from "vue-router";

import VConsole from "vconsole";

//重写push/replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};

import ChatGpt from "../pages/Index";
import MChatGpt from "../pages/MIndex";
import Course from "../pages/Course";
import Mianze from "../pages/Mianze";


const router = new VueRouter({
    // mode: 'history',
    // base: '/shudong',
    routes: [
        {
            name: "ChatGpt",
            path: "/",
            component: ChatGpt,
        },
        {
            name: "MChatGpt",
            path: "/m",
            component: MChatGpt,
        },
        {
            name: "Course",
            path: "/course",
            component: Course,
        },
        {
            name: "Mianze",
            path: "/mianze",
            component: Mianze,
        }
    ],
    // scrollBehavior(to, from, savedPosition) {
    //     return { x: 0, y: 0 };
    // },
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.query.c === "1") {
        console.log("展示");
        Vue.prototype.$vconsole = new VConsole();
    } else {
        if(Vue.prototype.$vconsole){
            Vue.prototype.$vconsole.destroy();
            Vue.prototype.$vconsole = null;
        }
    }
    next();
});

export default router;
