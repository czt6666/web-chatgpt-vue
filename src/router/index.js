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

import ChatGpt from "@/pages/Index";
import MChatGpt from "@/pages/MIndex";
import Home from "@/pages/Home";
import MHome from "@/pages/MHome";
import BaseInfo from "@/components/home/main/BaseInfo";
import Account from "@/components/home/main/Account";
import Help from "@/components/home/main/Help";
import Wallet from "@/components/home/main/Wallet";



const router = new VueRouter({
    // mode: 'history',
    // base: '/shudong',
    routes: [
        {
            name: "ChatGpt",
            path: "/",
            component: ChatGpt,
            // children: [
            //     {
            //         name: "home",
            //         path: "home",
            //         component: Home,
            //     },
            // ]
        }, {
            name: "MChatGpt",
            path: "/m",
            component: MChatGpt,
        },
        {
            name: "Home",
            path: "/home",
            component: Home,
            children: [
                {
                    name: "baseinfo",
                    path: "",
                    component: BaseInfo,
                },
                {
                    name: "wallet",
                    path: "wallet",
                    component: Wallet,
                },
                {
                    name: "account",
                    path: "account",
                    component: Account,
                },
                {
                    name: "help",
                    path: "help",
                    component: Help,
                },
            ]
        },
        {
            name: "MHome",
            path: "/m/home",
            component: MHome,
            children: [
                {
                    name: "baseinfo",
                    path: "",
                    component: BaseInfo,
                    meta:{
                        title:"个人信息"
                    }
                },
                {
                    name: "wallet",
                    path: "wallet",
                    component: Wallet,
                    meta:{
                        title:"钱包信息"
                    }
                },
                {
                    name: "account",
                    path: "account",
                    component: Account,
                    meta:{
                        title:"账号信息"
                    }
                },
                {
                    name: "help",
                    path: "help",
                    component: Help,
                    meta:{
                        title:"帮助反馈"
                    }
                },
            ]
        },
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
        if (Vue.prototype.$vconsole) {
            Vue.prototype.$vconsole.destroy();
            Vue.prototype.$vconsole = null;
        }
    }
    next();
});

export default router;
