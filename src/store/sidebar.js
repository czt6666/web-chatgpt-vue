import {
    reqdeleteallsession,
} from "@/api";
import axios from "axios";

const state = {
    can_delete_session: false,
    can_signout: false,
    can_select_style: false,
};

const actions = {
    // async deleteallsession(context) {
    //     let result = await reqdeleteallsession();
    //     if (result.status === 0) {
    //         context.commit("moduleDialog/CLEANALLSESSION", null, { root: true });
    //         context.commit("CHANG_SIDEBAR", 0, { root: true });
    //     }
    // },
};

const mutations = {
    // DELETEALLSESSION(state) {
    //     state.can_delete_session = !state.can_delete_session;
    // },
    SHOWSESSIONSTYLE(state, val) {
        state.can_select_style = !state.can_select_style;
    },
    SWITCHSESSIONSTYLE(state, val) {
        state.can_select_style = 0;
        setTimeout(() => {
            this.commit("CHANG_SIDEBAR", 0);
        }, 200)
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