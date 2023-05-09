// vuex
import Vue from "vue";
import Vuex from "vuex";
import moduleDialog from "./dialog";
import moduleSideBar from "./sidebar";
import router from "@/router";
import {Message} from "element-ui";
import {
    askchatgpt, changeheader, requserheader, reqhitsindex, reqhitscourse, reqhitsmianze
} from "@/api/index";

Vue.use(Vuex);


const state = {
    // 0:pc     1:phone
    layout_mod: 0,
    // 0:关闭侧边栏    1:打开侧边栏
    show_sidebar: 0,
    // 记录 屏幕宽高
    client_width: 0,
    client_height: 0,
    userheader: "https://czt666.cn/gpt/img/user1.jpg",
};

// 创建store
const actions = {
    adapt(context, width) {
        let cur_layout = width <= 768 ? 1 : 0;
        let pre_layout = context.state.layout_mod;
        if (cur_layout !== pre_layout) {
            if (cur_layout === 1) {
                router.replace("/m");
                context.commit("ADAPT", 1);
            } else {
                router.replace("/");
                context.commit("ADAPT", 0);
            }
        }
    },
    // async askgpt3(context, ask) {
    //     // push 进去问题 is_ansing置1     1:问题  0：回答
    //     context.commit('ASKGPT3_ASK', ask)
    //     // 新用户默认头像
    //     let data = { ask, header: 'https://czt666.cn/gpt/img/user1.jpg', model: 'cgatgpt' }
    //     let result = await askgpt3(data)
    //     console.log(result);
    //     // push 进去回答 is_ansing置0
    //     if (result.status === 0) {
    //         context.commit('ASKGPT3_ANS', result.data)
    //     } else {
    //         // .data 为原始错误信息 push(message) 作为展示信息
    //         context.commit('ASKGPT3_ANS', result.data)
    //         // 错误提示
    //         Message({
    //             message: result.message,
    //             type: "warning",
    //         });
    //     }
    // },
    async changeheader(context, val) {
        let data = {header: val};
        let result = await changeheader(data);
        // console.log(result);
        // TODO：修改页面的 header
        if (result.status === 0) {
            context.commit("CHANGE_USERHEADER", result.data);
        }
    },
    async requserheader(context) {
        let result = await requserheader();
        // console.log(result);
        // TODO：修改页面的 header
        if (result.status === 0) {
            context.commit("CHANGE_USERHEADER", result.data);
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
        state.userheader = val;
    },
    CHANG_SIDEBAR(state, val) {
        state.show_sidebar = val;
    }
};


const getters = {};

// 创建并导出
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    modules: {moduleSideBar, moduleDialog}
});