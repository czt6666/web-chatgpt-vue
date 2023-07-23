// vuex
import Vue from "vue";
import Vuex from "vuex";
import moduleDialog from "./dialog";
import moduleSideBar from "./sidebar";
import moduleUserinfo from "./userinfo";
import modulePayment from "./payment";
import router from "@/router";
import {
    askchatgpt, changeheader, requserheader, reqhitsindex, reqhitscourse, reqhitsmianze, reqinitconfig
} from "@/api";

Vue.use(Vuex);


const state = {
    // 0:pc     1:phone
    layout_mod: 0,
    // 0:关闭侧边栏    1:打开侧边栏
    show_sidebar: 0,
    // 0:关闭弹窗   1:打开弹窗
    show_popup: {
        show_about_popup: false,
        show_payment_popup: false,
        show_login_popup: false,
        show_token_popup: false,
        show_collect_popup: false,
    },
    // 网页初始化信息
    init: {
        is_free: false,
        free_title: "",
        goods: [
            {
                id: "x0500",
                title: "优惠畅享",
                text: "",
                money: "￥5.0",
            },
            {
                id: "y2000",
                title: "限时减免",
                text: "充值20到账30元",
                money: "￥20.0",
                corner_text: "优惠50%",
            },
            {
                id: "z9900",
                title: "至尊VIP",
                text: "终身免费使用",
                money: "￥99.0",
            },
        ],
        current_goods_id: "y2000",
        welcome_tips: null,
        //     [
        //     {
        //         icon: "https://czt666.cn/gpt/img/umbrella.svg",
        //         title: "简单的问候",
        //         content: ["你好", "你是谁", "很高兴遇见你"],
        //     },
        //     {
        //         icon: "https://czt666.cn/gpt/img/shopping.svg",
        //         title: "编程实现",
        //         content: [
        //             "用js写一个轮播图",
        //             "用java打印helloworld",
        //             "用python实现梯度下降算法",
        //         ],
        //     },
        //     {
        //         icon: "https://czt666.cn/gpt/img/painting.svg",
        //         title: "AI创作",
        //         content: [
        //             "猫的屎臭不臭",
        //             "四六级考场攻略",
        //             "父亲节礼物和礼物推荐",
        //         ],
        //     },
        // ],
    },
    // 记录 屏幕宽高
    client_width: 0,
    client_height: 0,
};

// 创建store
const actions = {
    adapt(context, screenWidth) {
        if (screenWidth < 768) {
            // 如果屏幕宽度小于 768，就更改 layout_mod
            context.commit("ADAPT", 1);
            if (!router.currentRoute.path.startsWith("/m")) {
                // 如果当前路由路径没有以 /m 开头 则在路径前面加上 /m
                router.replace(`/m${router.currentRoute.path}`);
            }
        } else if (screenWidth >= 768) {
            context.commit("ADAPT", 0);
            if (router.currentRoute.path.startsWith("/m")) {
                router.replace(router.currentRoute.path.substring(2) || "/");
            }
        }
    },
    // adapt(context, screenWidth) {
    //     if (screenWidth < 768 && !router.currentRoute.path.startsWith("/m")) {
    //         // 如果屏幕宽度小于 768，并且当前路由路径没有以 /m 开头 则在路径前面加上 /m
    //         router.replace(`/m${router.currentRoute.path}`);
    //         context.commit("ADAPT", 1);
    //     } else if (screenWidth >= 768 && router.currentRoute.path.startsWith("/m")) {
    //         // 如果屏幕宽度大于等于 760，并且当前路由路径以 /m 开头，则去掉 /m
    //         router.replace(router.currentRoute.path.substring(2));
    //         context.commit("ADAPT", 0);
    //     }
    // },
    changerouter(content, path) {
        const currentPath = router.currentRoute.path;
        // 判断路径前缀
        if (currentPath.startsWith("/m")) {
            router.push("/m" + path);
        } else {
            router.push("" + path);
        }
    },
    async changeheader(context, val) {
        let data = {header: val};
        let result = await changeheader(data);
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USERHEADER", result.data);
        }
    },
    // async requserheader(context) {
    //     let result = await requserheader();
    //     // console.log(result);
    //     if (result.status === 0) {
    //         context.commit("CHANGE_USERHEADER", result.data);
    //     }
    // },
    async reqinitconfig(context) {
        let result = await reqinitconfig();
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_INITCONFIG", result.data);
        }
    },
    // 增加阅读量
    hitsindex(context) {
        reqhitsindex();
    },
    hitscourse(context) {
        reqhitscourse();
    },
    hitsmianze(context) {
        reqhitsmianze();
    },
};

const mutations = {
    ADAPT(state, val) {
        state.layout_mod = val;
    },
    CHANGE_USERHEADER(state, val) {
        state.moduleUserinfo.user_all_info.head = val
    },
    CHANG_SIDEBAR(state, val) {
        state.show_sidebar = val;
    },
    CHANG_ABOUT_POPUP(state, val) {
        state.show_popup.show_about_popup = val;
    },
    CHANG_PAYMENT_POPUP(state, val) {
        state.show_popup.show_payment_popup = val;
    },
    CHANG_LOGIN_POPUP(state, val) {
        state.show_popup.show_login_popup = val;
    },
    CHANG_TOKEN_POPUP(state, val) {
        state.show_popup.show_token_popup = val;
    },
    CHANG_COLLECT_POPUP(state, val) {
        state.show_popup.show_collect_popup = val;
    },
    CHANG_ALL_POPUP(state, val) {
        for (const key in state.show_popup) {
            state.show_popup[key] = val;
        }
    },
    CHANGE_GOODS_ID(state, val) {
        state.init.current_goods_id = val;
    },
    CHANGE_INITCONFIG(state, val) {
        // 版本号不一样 且 sessionstorage中没记录刷新
        if (val.version !== Vue.prototype.$config.VERSION &&
            !sessionStorage.getItem("isReload")) {
            sessionStorage.setItem("isReload", true);
            location.reload(true); // 刷新
        }
        // console.log(val);
        state.init = val;
    }
};


const getters = {
    show_all_popu(state) {
        const allValues = Object.values(state.show_popup);
        return allValues.reduce((acc, cur) => acc || cur, false); // true
    },
};

// 创建并导出
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules: {
        moduleSideBar, moduleDialog,
        moduleUserinfo, modulePayment
    }
});