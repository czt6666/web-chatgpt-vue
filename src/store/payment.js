import { calculatesign } from "@/api";
import Vue from "vue";


const state = {
};

const actions = {
    async calculatesign(context, goods_id) {
        // 获取当前网站域名
        const hostname = getCurrentDomain()
        const data = {
            goods_id,
            pay_type: "wx",
            source: hostname,
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

function getCurrentDomain() {
    const hostname = window.location.hostname
    // 不在运营范围内的域名 返回
    if (!Vue.prototype.$config.RUNNING_HOSTNAME.includes(hostname)) {
        return 'czt666.cn'
    }
    return hostname;
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};