import {
    reqdeleteallsession,
    reqmockimages
} from "../api";
import axios from "axios";

const state = {
    can_delete_session: false,
    can_signout: false,
    can_select_style: false,
};

const actions = {
    async deleteallsession(context) {
        if (context.state.can_delete_session) {
            let result = await reqdeleteallsession();
            console.log(result);
            if (result.status === 0) {
                context.commit("moduleDialog/CLEANALLSESSION", null, {root: true});
                context.commit("CHANG_SIDEBAR", 0, {root: true});
            }
        }
        context.commit("DELETEALLSESSION");
    },
};

const mutations = {
    DELETEALLSESSION(state) {
        state.can_delete_session = !state.can_delete_session;
    },
    // CLEANSESSION(state){
    // state.
    // },
    SIGNOUT(state, val) {
        if (state.can_signout) {
            // console.log("可以退出");
            localStorage.removeItem("Token-gpt");
            localStorage.removeItem("Token-gpt-2");
            setTimeout(()=>{
                this.commit("CHANG_SIDEBAR", 0);
            },200)
        }
        state.can_signout = !state.can_signout;
    },
    SHOWSESSIONSTYLE(state, val) {
        state.can_select_style = !state.can_select_style;
    },
    SWITCHSESSIONSTYLE(state, val) {
        state.can_select_style = 0;
        setTimeout(()=>{
            this.commit("CHANG_SIDEBAR", 0);
        },200)
    },
};

const getters = {};

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};