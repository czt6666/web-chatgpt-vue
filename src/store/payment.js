import {calculatesign} from "@/api";


const state = {
};

const actions = {
    async calculatesign(context, goods_id) {
        const data = {
            goods_id,
            pay_type: "wx",
        };
        let result = await calculatesign(data);
        if (result.status === 0) {
            const query = result.data
            const params = Object.keys(query).map(key => key + '=' + encodeURIComponent(query[key])).join('&');
            window.location = `https://grant.damicms.com/pay/index?${params}`
        }
    },
};

const mutations = {
    CHANGE_USER_ALL_INFO(state, val) {
        // state.user_all_info = val;
    },
};

const getters = {
};

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};