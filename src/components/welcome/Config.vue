<template>
    <div>
        <div
            class="content"
            :style="{ flexDirection: layout_mod ? 'column' : 'row' }"
        >
            <!--直接提问-->
            <ul
                class="clume"
                :style="{ marginLeft: layout_mod ? '0px' : '10px' }"
            >
                <!-- 头部 icon图标 -->
                <li class="inc">
                    <img :src="system_conf.ask.icon" class="icon" alt="icon" />
                    <span class="title">{{ system_conf.ask.title }}</span>
                </li>
                <!-- 选项卡 -->
                <li
                    class="cont tips"
                    v-for="(content, idx) of system_conf.ask.content"
                    :key="idx"
                    @click="setQuestion(content)"
                >
                    {{ content }}
                </li>
            </ul>

            <!--实用预设-->
            <ul
                class="clume"
                :style="{ marginLeft: layout_mod ? '0px' : '10px' }"
            >
                <!-- 头部 icon图标 -->
                <li class="inc">
                    <img :src="system_conf.tool.icon" class="icon" alt="icon" />
                    <span class="title">{{ system_conf.tool.title }}</span>
                </li>
                <!-- 选项卡 -->
                <li
                    class="cont"
                    v-for="(content, idx) of system_conf.tool.content"
                    :key="idx"
                    :class="
                        [length, tool, tone].includes(content.value)
                            ? 'cont-current'
                            : ''
                    "
                    @click="changeOption(content)"
                >
                    {{ content.value }}
                </li>
            </ul>
            <!--自定义系统-->
            <ul
                class="clume"
                :style="{ marginLeft: layout_mod ? '0px' : '10px' }"
            >
                <!-- 头部 icon图标 -->
                <li class="inc">
                    <img :src="system_conf.role.icon" class="icon" alt="icon" />
                    <span class="title">{{ system_conf.role.title }}</span>
                </li>
                <!--输入框-->
                <li class="cont role">
                    <textarea
                        class="input"
                        placeholder="假如你是"
                        v-model="role_discrib"
                        @input="changeInput(role_discrib)"
                    ></textarea>
                </li>
            </ul>
        </div>
        <!-- 使用教程链接 -->
        <a :href="$link.playing" class="link question">最佳实践</a>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "welcome",
        data() {
            return {
                main_title: "ChatGPT",
                system_conf: {
                    ask: {
                        icon: "https://czt666.cn/gpt/img/ask.png",
                        title: "直接提问",
                        content: ["你好", "你是谁", "写一份简历"],
                    },
                    tool: {
                        icon: "https://czt666.cn/gpt/img/tool.png",
                        title: "实用预设",
                        content: [
                            {
                                value: "文生图",
                                type: "tool",
                            },
                            {
                                value: "最简回答",
                                type: "length",
                            },
                            {
                                value: "显示更多 >",
                                type: "show_more",
                            },
                        ],
                    },
                    role: {
                        icon: "https://czt666.cn/gpt/img/role.png",
                        title: "自定义预设",
                    },
                },
                // 输入框内的内容
                role_discrib: "假如你是",
            };
        },
        computed: {
            ...mapState(["layout_mod"]),
            ...mapState({
                length: (state) => state.moduleDialog.system_describe.length,
                tone: (state) => state.moduleDialog.system_describe.tone,
                tool: (state) => state.moduleDialog.system_describe.tool,
            }),
        },
        methods: {
            changeOption(option) {
                if (option.type === "show_more") {
                    // 打开更多选项弹窗
                    this.$store.commit("CHANG_SYSTEM_OPTIONS_POPUP", true);
                    return;
                }
                this.$store.commit("moduleDialog/FIXSYSTEMOPTION", option);
            },
            changeInput(content) {
                this.$store.commit("moduleDialog/FIXSYSTEMINPUT", content);
            },
            setQuestion(ques) {
                this.$bus.$emit("setQuestion", ques);
            },
        },
    };
</script>

<style scoped>
    .box {
        display: flex;
        flex-direction: column;
        width: 96%;
        max-width: 800px;
        margin: 0 auto;
        padding-top: 30px;
    }

    .content {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 20px;
        text-align: center;
        color: var(--text-color);
    }

    .link {
        float: right;
        line-height: 18px;
        font-size: 14px;
        color: var(---link-color);
        text-decoration: underline;
    }
    /* 疑问问号 */
    .question::after {
        content: "\e924";
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 14px;
        color: var(---link-color);
        text-rendering: auto;
        text-decoration: underline;
        line-height: 18px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* 每一列 */
    .clume {
        flex: 1;
        margin-left: 10px;
    }

    .clume:nth-child(1) {
        margin-left: 0;
    }

    /* item */
    .clume li {
        margin-bottom: 10px;
    }
    .tips:after {
        content: "\f178";
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: inherit;
        /* color: #10aeec; */
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    /* item （icon) */
    .inc .icon {
        display: block;
        height: 48px;
        margin: 0 auto;
    }

    /* item (content) */
    .cont {
        padding: 10px;
        border-radius: 5px;
        background-color: var(--welcome-page-option-background-color);
        cursor: pointer;
    }

    .role {
        width: 100%;
        min-height: 164px;
        height: 164px;
    }

    .input {
        width: 100%;
        height: 100%;
        border: none;
        resize: none;
        color: var(--text-color);
        background-color: transparent;
    }

    .input:focus {
        border: none;
        outline: none;
    }

    .cont-current {
        background-color: var(--welcome-page-option-select-background-color);
    }
</style>
