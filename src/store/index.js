// vuex
import Vue from "vue";
import Vuex from "vuex";
import moduleDialog from "./dialog";
import moduleSideBar from "./sidebar";
import moduleUserinfo from "./userinfo";
import modulePayment from "./payment";
import router from "@/router";
import {
    askchatgpt, changeheader, requserheader, reqhitsindex, reqhitscourse,
    reqhitsmianze, reqinitconfig, noticeviewedbyuser,
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
        show_more_options_popup: false,
        show_system_options_popup: false,
        show_gpt4_notice_popup: false,
        show_system_describe_popup: false,
        show_notice_popup: false,
    },
    // false:暗色     true:亮色
    theme: true,
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
        notice: {
            should_show: false,
            title: "通知",
            name: "",
            content: [""],
            data: "",
        }
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
        let data = { header: val };
        let result = await changeheader(data);
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USERHEADER", result.data);
        }
    },
    async reqinitconfig(context) {
        let result = await reqinitconfig();
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_INITCONFIG", result.data);
        }
    },
    async noticeviewedbyuser(context, val) {
        let data = { notice_tag: val };
        console.log(data);
        let result = await noticeviewedbyuser(data);
        console.log(result);
        context.commit("CHANG_NOTICE_POPUP", false);
        if (result.status === 0) {
            console.log("success");
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
        state.moduleUserinfo.user_all_info.head = val;
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
    CHANG_MORE_OPTIONS_POPUP(state, val) {
        state.show_popup.show_more_options_popup = val;
    },
    CHANG_SYSTEM_OPTIONS_POPUP(state, val) {
        state.show_popup.show_system_options_popup = val;
    },
    CHANG_GPT4_NOTICE_POPUP(state, val) {
        state.show_popup.show_gpt4_notice_popup = val;
    },
    CHANG_SYSTEM_DESCRIBE_POPUP(state, val) {
        state.show_popup.show_system_describe_popup = val;
    },
    CHANG_NOTICE_POPUP(state, val) {
        state.show_popup.show_notice_popup = val;
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
        // 有通知，显示弹窗
        if (val.notice && val.notice.should_show) {
            state.show_popup.show_notice_popup = true;
        }
        state.init = val;
    },
    SWITCHTHEME(state) {
        state.theme = !state.theme;
        localStorage.setItem('theme', state.theme ? 'light-theme' : 'dark-theme');
    }
};


const getters = {
    show_all_popu(state) {
        const allValues = Object.values(state.show_popup);
        return allValues.reduce((acc, cur) => acc || cur, false); // true
    },
    nitice_info(state) {
        return state.init.notice
    },
    themeColor(state) {
        const storageTheme = localStorage.getItem('theme')
        if (storageTheme === 'dark-theme') {
            state.theme = false
        }
        return state.theme ? 'light-theme' : 'dark-theme'
    }
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