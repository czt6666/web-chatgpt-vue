import {
    reqallsession, askchatgpt, reqdialogbysessionid, deltsessionbyid,
} from "../api";
import {Message} from "element-ui";
import Vue from "vue";
import stramFetch from "../api/fetch";

const state = {
    current_session_id: undefined,
    // 0:没有正在回答   1:正在回答
    is_ansing: false,
    // 0:正常情况   1:流式传输的时候切换了session
    is_chaos: false,

    messages: [
        // {role: "user", content: "```在dialog.js里的超长测试文本------测试在一行文本超长情况下首页是否会发生结构改变------测试在一行文本超长情况下首页是否会发生结构改变------测试在一行文本超长情况下首页是否会发生结构改变------测试在一行文本超长情况下首页是否会发生结构改变------测试在一行文本超长情况下首页是否会发生结构改变------测试在一行文本超长情况下首页是否会发生结构改变```"}
    ],
    style: "",
    session: [],
};

const actions = {
    // 请求会话信息
    async reqallsession(context, data) {
        // 异步 api 请求
        let result = await reqallsession();
        console.log(result);
        if (result.status === 0) {
            context.commit("REQALLSESSION", result.data);
        }
    },
    // 与 chatgpt 对话
    async askchatgpt(context, ask) {
        context.commit("CHANGEANSING", true);
        let mess = {role: "user", content: ask};
        context.state.messages.push(mess);
        let question = {
            ask,
            style: context.state.style,
            messages: JSON.stringify(context.state.messages),
            session_id: context.state.current_session_id,
        };
        // console.log(question);
        let result = await askchatgpt(question);
        console.log(result);
        context.commit("CHANGEANSING", false);
        if (result.status === 0) {
            context.commit("ASKCHATGPT", result.data);
        } else {
            // 错误提示
            Message({
                message: result.message,
                type: "warning",
            });
        }
    },
    // stream与chatgpt 对话
    async streamaskchatgpt(context, ask) {
        // 1. 设置 is_ansing 为 true
        context.commit("CHANGEANSING", true);
        let mess = {role: "user", content: ask};
        // 2. 添加user的问题
        context.state.messages.push(mess);
        // 3. 打包question发送给server
        let question = {
            ask,
            style: context.state.style,
            messages: JSON.stringify(context.state.messages),
            session_id: context.state.current_session_id,
        };
        // 4. 开始回答中的动画 !!顺序必须在3后
        context.commit("STARTASKCHATGPT");
        // 5. 发送请求等待回答
        let result = await stramFetch(question, context);
        console.log(result);
        context.commit("CHANGEANSING", false);
        if (result.status === 0) {
            // 6.1 回答成功 覆盖之前的回答
            context.commit("FINISHASKCHATGPT", result.data);
        } else {
            // 6.2 回答失败 错误提示 + 回答框标红
            Message({
                message: result.message,
                type: "warning",
            });
            context.commit("FAILASKCHATGPT", result.message);
        }
    },
    // 切换当前session ID
    async switchcurrentsessionid(context, session_id) {
        // 异步 api 请求
        let data = {session_id};
        let result = await reqdialogbysessionid(data);
        console.log(result);
        if (result.status === 0) {
            context.commit("SWITCHCURRENTSESSIONID", session_id);
            context.commit("REPLACEMESSAGE", result.data);
            context.commit("CHANG_SIDEBAR", 0, {root: true});
        }
    },
    // 删除 session
    async deletesession(context, session_id) {
        // 异步 api 请求
        let data = {session_id};
        let result = await deltsessionbyid(data);
        console.log(result);
        if (result.status === 0) {
            context.commit("DELETESESSION", session_id);
            context.commit("CHANG_SIDEBAR", 0, {root: true});
        }
    },
};

const mutations = {
    SWITCHCURRENTSESSIONID(state, val) {
        if (state.is_ansing) {
            state.is_chaos = true;
        }
        state.current_session_id = val;
    },
    REPLACEMESSAGE(state, val) {
        state.messages = val;
    },
    REQALLSESSION(state, val) {
        state.session = val;
    },
    CHANGEANSING(state, val) {
        state.is_ansing = val;
    },
    NEWCHAT(state, style) {
        // console.log("添加session style:", style);
        state.style = style || undefined;
        state.current_session_id = undefined;
        state.messages.splice(0, state.messages.length);
        this.commit("CHANG_SIDEBAR", 0);
    },
    CLEANALLSESSION(state) {
        // 清空会话列表 清空message列表 清空current_id
        state.session.splice(0, state.session.length);
        state.current_session_id = undefined;
        state.messages.splice(0, state.messages.length);
    },
    DELETESESSION(state, val) {
        let index = 0;
        for (let i = 0; i < state.session.length; i++) {
            if (state.session[i].id === val) {
                index = i;
                break;
            }
        }
        state.session.splice(index, 1);
        // 如果 cur_ses_id 为此 id，清空messages
        if (state.current_session_id === val) {
            state.messages.splice(0, state.messages.length);
        }
    },
    ASKCHATGPT(state, val) {
        // 1. push messages 数组
        state.messages.push(val.messages);
        // 2. 新建了 session
        if (val.session.new_session) {
            // 2.1 切换 session ID
            state.current_session_id = val.session.id;
            // 2.2 添加 system 描述
            state.messages.unshift({role: "system", content: val.session.system});
            // 2.3 添加 session
            state.session.push({
                id: val.session.id,
                title: val.session.title
            });
        }
    },
    STARTASKCHATGPT(state, val) {
        // 新建 assistant 回答
        if (state.messages[state.messages.length - 1].role === "user") {
            Vue.set(state.messages, state.messages.length, {
                role: "assistant",
                content: "",
                showCursor: true,
            });
        }
    },
    STREAMUPDATEMESSAGE(state, val) {
        // 若上一条为 user 就创建新对话对象
        if (state.messages[state.messages.length - 1]?.role === "user") {
            Vue.set(state.messages, state.messages.length, {
                role: "assistant",
                content: "",
                showCursor: true,
            });
        }
        // 不混换的时候 更新 content 内容
        if (!state.is_chaos) {
            const oldcont = state.messages[state.messages.length - 1].content;
            Vue.set(state.messages, state.messages.length - 1, {
                role: "assistant",
                content: oldcont + val,
                showCursor: true, // 每次更新持续设置 showCursor 为 true
            });
        }
    },
    // mysqldump -u root -p --no-data chatgpt > chatgpt.sql
    FINISHASKCHATGPT(state, val) {
        // 1. 新建 session
        if (val.session.new_session) {
            // 1.1 添加 session
            state.session.push({
                id: val.session.id,
                title: val.session.title
            });
            // 1.2 添加 system 描述
            if (!state.is_chaos) {
                state.messages.unshift({role: "system", content: val.session.system});
            }
            // 1.3 切换 session ID
            state.current_session_id = val.session.id;
        }
        // 2. 把最后一个回答替换为标准 message
        if (!state.is_chaos) {
            Vue.set(state.messages, state.messages.length - 1, val.messages);
        }
        // 3. 不混乱了
        state.is_chaos = false;
    },
    FAILASKCHATGPT(state, val) {
        // 设置最后一个 assistant 为错误信息
        if (state.messages[state.messages.length - 1].role === "assistant") {
            Vue.set(state.messages, state.messages.length - 1, {
                role: "assistant",
                content: "回答失败，请稍后再试",
            });
        }
        // 3. 不混乱了
        state.is_chaos = false;
    },
};

const getters = {
    curr_session_title(state) {
        const sessions = state.session;
        if (sessions.length) {
            for (const sess of sessions) {
                if (sess.id === state.current_session_id) {
                    return sess.title;
                }
            }
        } else {
            return "";
        }
    },
};

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};