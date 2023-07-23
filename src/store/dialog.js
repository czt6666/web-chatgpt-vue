import {deltsessionbyid, reqallsessiondetail,} from "@/api";
import {Message} from "element-ui";
import Vue from "vue";
import stramFetch from "../api/fetch";
import model from "@/components/welcome/Model";

const state = {
    // 0:没有正在回答   1:正在回答
    is_ansing: false,
    // 0:正常情况   1:流式传输的时候切换了session
    is_chaos: false,

    system_describe: {
        tone: null, // 语气
        length: null, // 长短
        role: null, // 角色扮演
    },

    all_session: {
        0: {
            messages: [],
        },
    },
    model: "gpt-3.5-turbo",
    current_session_id: undefined,
};

const actions = {
    // 请求会话详细信息
    async reqallsession(context, data) {
        // 异步 api 请求
        let result = await reqallsessiondetail();
        // console.log(result);
        if (result.status === 0) {
            context.commit("REQALLSESSIONDETAIL", result.data);
        }
    },
    // stream与chatgpt 对话
    async streamaskchatgpt(context, ask) {
        // 开始提问 动画
        context.commit("CHANGEANSING", true);
        // 当前session不存在   !顺序不要变
        if (context.state.current_session_id === undefined) {
            context.commit("NEWSESSION");
        }
        // 在messages中添加用户提问
        const mess = {role: "user", content: ask};
        const cur_sen_id = context.state.current_session_id;
        const cur_messages = context.state.all_session[cur_sen_id].messages;
        cur_messages.push(mess);
        // 3 请求体
        const question = {
            ask,
            model: context.state.model,
            session_id: cur_sen_id,
            messages: JSON.stringify(cur_messages),
        };
        // 添加GPT回答段 !!顺序必须在3后
        context.commit("STARTASKCHATGPT", cur_messages);
        // 发起请求
        let result = await stramFetch(question, context);
        // console.log(result);
        context.commit("CHANGEANSING", false);
        if (result.status === 0) {
            // 7.1 回答成功 覆盖之前的回答
            context.commit("FINISHASKCHATGPT", result.data);
            // 7.2 0元以下弹窗
            if (result.data.payment.show_recharge) {
                context.commit("CHANG_PAYMENT_POPUP", 1, {root: true});
            }
        } else if (result.status === 6) {
            // 正在更新
            Message({
                message: result.message,
                type: "success",
            });
            context.commit("FAILASKCHATGPT", result.data.content);
        } else if (result.status === 7) {
            // 7.3 服务器繁忙 错误提醒 + 红色回答
            context.commit("FAILASKCHATGPT", `服务器繁忙，请稍后再试`);
        } else if (result.status === 8) {
            // 用户欠费超过 xx元，弹窗
            Message({
                message: result.message,
                type: "warning",
            });
            context.commit("CHANG_PAYMENT_POPUP", 1, {root: true});
            context.commit("FAILASKCHATGPT", `钱包余额已欠费${result.data.wallet.toFixed(2)}元`);
        } else {
            // 7.4 回答失败 错误提示 + 回答框标红
            Message({
                message: result.message,
                type: "warning",
            });
            context.commit("FAILASKCHATGPT");
        }
    },
    // 切换当前session ID
    async switchcurrentsessionid(context, session_id) {
        context.commit("SWITCHCURRENTSESSIONID", session_id);
        context.commit("CHANG_SIDEBAR", 0, {root: true});
    },
    // 删除 session
    async deletesession(context, session_id) {
        // 异步 api 请求
        let data = {session_id};
        let result = await deltsessionbyid(data);
        // console.log(result);
        if (result.status === 0) {
            context.commit("DELETESESSION", session_id);
            context.commit("CHANG_SIDEBAR", 0, {root: true});
        }
    },
};

const mutations = {
    // 切换 session id
    SWITCHCURRENTSESSIONID(state, val) {
        if (state.is_ansing) {
            state.is_chaos = true;
        }
        state.current_session_id = val;
    },
    REQALLSESSIONDETAIL(state, val) {
        state.all_session = val;
    },
    CHANGEANSING(state, val) {
        state.is_ansing = val;
    },
    CHANGEMEDEL(state, val) {
        state.model = val;
    },
    NEWCHAT(state, tone) {
        // 将聊天自定义配置设为 null
        for (let key in state.system_describe) {
            state.system_describe[key] = null;
        }
        // 设置 语气tone
        state.system_describe.tone = tone || undefined;
        state.current_session_id = undefined;
        this.commit("CHANG_SIDEBAR", 0);
    },
    // 新建一个session
    NEWSESSION(state) {
        state.current_session_id = 0;
        const description = getSystemDescription(state.system_describe, state.model);
        // 新建一个索引为0的session
        Vue.set(state.all_session, 0, {
            // 添加一条system描述
            messages: [description]
        });
    },
    // 删除所有 session
    CLEANALLSESSION(state) {
        // 清空会话列表 清空message列表 清空current_id
        state.all_session = {};
        state.current_session_id = undefined;
    },
    // 删除一个 session
    DELETESESSION(state, val) {
        // 从列表中删掉这个 id
        Vue.delete(state.all_session, val);
        // 如果 cur_ses_id 为此 id, 重置 current_session_id
        if (state.current_session_id === val) {
            state.current_session_id = undefined;
        }
    },
    // 开始问 chatgpt
    STARTASKCHATGPT(state, cur_messages) {
        // 在最后一个位置 新建assistant回答
        if (cur_messages[cur_messages.length - 1].role === "user") {
            Vue.set(cur_messages, cur_messages.length, {
                role: "assistant",
                content: "",
                showCursor: true,
            });
        }
    },
    // 流式更新回答
    STREAMUPDATEMESSAGE(state, val) {
        // 若上一条为 user 就创建新对话对象
        const cur_sen_id = state.current_session_id;
        const cur_messages = state.all_session[cur_sen_id].messages;
        // 不混换的时候 更新 content 内容
        if (!state.is_chaos) {
            const oldcont = cur_messages[cur_messages.length - 1].content;
            Vue.set(cur_messages, cur_messages.length - 1, {
                role: "assistant",
                content: oldcont + val,
                showCursor: true, // 每次更新持续设置 showCursor 为 true
            });
        }
    },
    // 问chatgpt结束
    FINISHASKCHATGPT(state, val) {
        const session_id = val.session_id;
        // 新建了 session
        if (val.session.new_session) {
            // 插入以id为索引的session
            Vue.set(state.all_session, session_id, {
                id: session_id,
                title: val.session.title,
                model: val.session.model,
                messages: state.all_session[0].messages,
            });
            // 删除临时项
            Vue.delete(state.all_session, 0);
            // 切换session ID
            state.current_session_id = session_id;
        }
        // 把最后一个回答替换为标准 message
        const cur_dialog = state.all_session[session_id].messages;
        if (!state.is_chaos) {
            Vue.set(cur_dialog, cur_dialog.length - 1, val.messages);
        }
        // 不混乱了
        state.is_chaos = false;
    },
    // 问chatgpt失败
    FAILASKCHATGPT(state, val = "回答失败，请稍后再试") {
        const cur_sen_id = state.current_session_id;
        const cur_messages = state.all_session[cur_sen_id].messages;
        // 设置最后一个 assistant 为错误信息
        if (!state.is_chaos && cur_messages[cur_messages.length - 1].role === "assistant") {
            Vue.set(cur_messages, cur_messages.length - 1, {
                role: "assistant",
                content: val,
            });
        }
        // 3. 不混乱了
        state.is_chaos = false;
    },
    // 修改聊天 system描述
    FIXSYSTEM(state, obj) {
        // 两次点击 取消选择
        const key_zh = obj.val === state.system_describe[obj.key] ? null : obj.val;
        // 存储被选择的key值 (这样才知道在页面中知道谁被选择了)
        state.system_describe[obj.key] = key_zh;
    }
};

const getters = {
    curr_session_title(state) {
        const session = state.all_session[state.current_session_id];
        return session?.title || "";
    },
    display_messages(state) {
        const cid = state.current_session_id;
        const asen = state.all_session;
        if (!asen[cid]) {
            // 当前对话什么东西都没有
            return [];
        }

        return asen[cid].messages;
    },
    display_session(state) {
        const asen = state.all_session;
        const keys = Object.keys(asen).sort((a, b) => b - a);
        const display = [];
        for (const key of keys) {
            if (key === '0') continue;
            display.push(asen[key]);
        }
        return display;
    }
};

function getSystemDescription(description, model) {
    // 从prototype中获取对应的描述
    const lib = Vue.prototype.$config.system;
    let tone = lib.tone[description.tone] || "";
    const length = lib.length[description.length] || "";
    let role = "";
    if (description.role) {
        role = description.role + "。";
    }

    // 处理随机风格
    if (description.tone === "随机风格") {
        // 随机选取一个键
        const keys = Object.keys(lib.tone);
        const key_zh = keys[Math.floor(Math.random() * keys.length)];
        // 修改tone的值
        tone = lib.tone[key_zh];
    }

    // 模型修正描述
    const model_describ = lib.model[model];

    return {
        role: "system",
        content: `${role}${model_describ}${tone}${length}`
    };
}


export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};