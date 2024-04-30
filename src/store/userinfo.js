import {
    requserallinfo, requserwallet, changeusernick,
    changeuserphone, changeuseremail, recoveraccountbyphone,
    recoveraccountbyemail, recoveraccountbytoken,
} from "@/api";
import { Message } from "element-ui";
import router from "@/router";

const state = {
    user_all_info: {
        id: null,
        nick: null,
        phone: null,
        email: null,
        creat_time: null,
        is_vip: false,
        is_member: false,
        wallet: "0.00",
        head: "https://czt666.cn/gpt/img/user2_2.jpg",
    },
};

const actions = {
    async requserallinfo(context) {
        let result = await requserallinfo();
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USER_ALL_INFO", result.data);
        } else if (result.status === 2) {
            // 新用户
            if (router.currentRoute.path.includes("/home")) {
                // 在账号信息页面 弹提示框
                Message({
                    // duration: 2000,
                    // showClose: true,
                    type: "warning",
                    message: "请先向ChatGPT提问",
                    // message: "未查询到账号，向ChatGPT提问以创建账号",
                });
            }
        }
    },
    async requserwallet(context) {
        let result = await requserwallet();
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USER_WALLET", result.data);
        } else {
            // 新用户
        }
    },
    async changeusernick(context, val) {
        let data = { nick: val };
        let result = await changeusernick(data);
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USER_NICK", result.data);
        } else {
            // 新用户
            Message({
                message: "未查询到账号，向ChatGPT提问以创建账号",
                type: "error",
            });
        }
    },
    async changeuserphone(context, val) {
        let data = { phone: val };
        let result = await changeuserphone(data);
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USER_PHONE", result.data);
        }
        resultHandle(result, "手机号", "修改");
    },
    async changeuseremail(context, val) {
        let data = { email: val };
        let result = await changeuseremail(data);
        // console.log(result);
        if (result.status === 0) {
            context.commit("CHANGE_USER_EMAIL", result.data);
        }
        resultHandle(result, "邮箱", "修改");
    },
    async recoveraccountbyphone(context, val) {
        let data = { phone: val };
        let result = await recoveraccountbyphone(data);
        // console.log(result);
        if (result.status === 0) {
            // 刷新页面
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
        resultHandle(result, "手机号", "登录");
    },
    async recoveraccountbyemail(context, val) {
        let data = { email: val };
        let result = await recoveraccountbyemail(data);
        console.log(result);
        if (result.status === 0) {
            // 刷新页面
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
        resultHandle(result, "邮箱", "登录");
    },
    async recoveraccountbytoken(context, val) {
        let data = { token: val };
        let result = await recoveraccountbytoken(data);
        // console.log(result);
        if (result.status === 0) {
            // 刷新页面
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
        resultHandle(result, "登录凭证", "登录");
    },
};

const mutations = {
    CHANGE_USER_ALL_INFO(state, val) {
        state.user_all_info = val;
    },
    CHANGE_USER_WALLET(state, val) {
        const data = {
            ...state.user_all_info,
            wallet: val,
        };
        state.user_all_info = data;
    },
    CHANGE_USER_NICK(state, val) {
        const data = {
            ...state.user_all_info,
            nick: val,
        };
        state.user_all_info = data;
    },
    CHANGE_USER_PHONE(state, val) {
        const data = {
            ...state.user_all_info,
            phone: val,
        };
        state.user_all_info = data;
    },
    CHANGE_USER_EMAIL(state, val) {
        const data = {
            ...state.user_all_info,
            email: val,
        };
        state.user_all_info = data;
    },
};

const getters = {
    // 获取用户钱包余额
    user_wallet(state) {
        try {
            // if (state.user_all_info.is_vip) {
            //     return "无穷";
            // }
            const money = Number(state.user_all_info.wallet).toFixed(2);
            return money + "元";
        } catch (error) {
            return null;
        }
    },
    // 获取用户用户会员过期时间
    user_member(state) {
        // 防止在未获取数据的时候显示
        if (state.user_all_info.is_member === undefined) {
            return null;
        }

        if (state.user_all_info.is_vip) {
            return "无限期会员";
        }

        if (state.user_all_info.is_member === false) {
            return "未开通会员";
        }


        const exptime = new Date(state.user_all_info.pay_expire);
        let month = exptime.getMonth() + 1;
        let day = exptime.getDate();
        let hours = exptime.getHours();

        return month + "月" + day + "日 " + hours + "点到期";
    },
    user_creat_account_date(state) {
        if (state.user_all_info === null) return null;
        try {
            const time = new Date(Number(state.user_all_info.creat_time));
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const today = time.getDate();
            const hour = time.getHours();
            const pm = hour < 12 ? "上午" : "下午";
            const creatData = `${year}年${month}月${today}日 ${pm}`;
            return creatData;
        } catch (err) {
            return null;
        }
    },
    check_user_bind(state) {
        const user_info = state.user_all_info;
        // 付费用户：余额大于0.5元 是会员的用户 是VIP
        if (user_info.wallet > 0.5 || user_info.is_member || user_info.is_vip) {
            // 没绑定：手机号为空 邮箱为空
            if (!user_info.phone && !user_info.email) {
                return true;
            }
        }
        return false;
    },
};

/**
 * 根据返回的状态，给出提示框
 * @param {Object} result - 返回的res。
 * @param {String} way - 方式：手机号/邮箱
 * @param {String} action - 动作：修改/登录
 * @returns {null}
 */
function resultHandle(result, way, action) {
    console.log(result);
    switch (result.status) {
        case 0:
            // 成功
            Message({
                message: `${action}成功`,
                type: "success",
            });
            break;
        case 1:
            // 其它已知错误
            Message({
                message: `${action}失败`,
                type: "error",
            });
            break;
        case 2:
            // 新用户
            Message({
                duration: 0,
                showClose: true,
                type: "warning",
                message: "未查询到账号，向ChatGPT提问以创建账号",
            });
            break;
        case 3:
            // 绑定 手机号重复
            Message({
                message: `绑定${way}失败，'${result.data}'已经被绑定了`,
                type: "error",
            });
            break;
        case 4:
            // 登录 手机号没有被绑定
            Message({
                message: `登录失败，'${result.data}'没有被绑定`,
                type: "error",
            });
            break;
        case 9:
            // 过于频繁
            Message({
                message: `${action}失败，请求过于频繁！`,
                type: "error",
            });
            break;
        default:
            // 其它未知错误
            Message({
                message: `操作失败！`,
                type: "error",
            });
            break;
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};