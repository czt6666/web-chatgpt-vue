<template>
    <div
        class="box"
        :style="{
            bottom: layout_mod ? '20px' : '30px',
            position: layout_mod ? 'fixed' : 'absolute',
        }"
    >
        <div class="bottom">
            <div class="btm-cont" ref="btm_content">
                <div class="input-box">
                    <label for="textarea" class="hidden">ask:</label>
                    <textarea
                        class="input"
                        v-model="ask"
                        ref="textarea"
                        id="textarea"
                        placeholder="给ChatGPT发送消息..."
                        label=""
                        autofocus="autofocus"
                        @keydown.alt.enter="addNewLine"
                        @keydown.enter="askchatgpt"
                        @input="textareaHeight"
                        rows="1"
                    ></textarea>
                </div>
                <div class="send-box">
                    <span class="submit" @click="askchatgpt">
                        <span class="send" :class="is_free ? 'free' : ''" v-show="!is_ansing"></span>
                        <div class="loading la-sm la-dark" v-show="is_ansing">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        <Filing />
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Filing from "@/components/input/Filing";

    export default {
        name: "Input",
        components: { Filing },
        data() {
            return {
                ask: ``,
                scrollHeight: "50",
                textarea_height: "",
            };
        },
        methods: {
            askchatgpt(event) {
                // 正在回答 不可提问
                if (this.is_ansing) {
                    this.$message({
                        message: "正在努力解决您的问题，暂时不可提问",
                        type: "warning",
                    });
                    // 删除回车符
                    const lastChar = this.ask.slice(-1);
                    if (lastChar === "\n") {
                        this.ask = this.ask.substring(0, this.ask.length - 1);
                        this.$refs.textarea.style.height = "auto";
                        this.$refs.btm_content.style.height = "auto";
                    }
                    return;
                }
                // 光标在中间 按enter键
                if (
                    event &&
                    event.target.selectionStart !== null &&
                    event.target.selectionEnd !== null &&
                    event.target.selectionStart === event.target.selectionEnd
                ) {
                    event.preventDefault();
                }

                const ask = this.ask.trim();
                // 提问内容为空
                if (!ask || ask === "") {
                    this.ask = ""; // 若只有回车，则删除回车
                    return;
                }

                this.$store.dispatch("moduleDialog/streamaskchatgpt", ask);
                this.ask = "";
                this.$refs.textarea.style.height = "auto";
                this.$refs.btm_content.style.height = "auto";
            },
            addNewLine() {
                this.ask += "\n";
            },
            textareaHeight(e) {
                const textarea = this.$refs.textarea;
                const btm_content = this.$refs.btm_content;
                textarea.style.height = "auto";
                const height = textarea.scrollHeight > 140 ? 140 : textarea.scrollHeight;
                textarea.style.height = height + "px";
                btm_content.style.height = height + "px";
            },
        },
        computed: {
            ...mapState({
                is_ansing: (state) => state.moduleDialog.is_ansing,
                layout_mod: (state) => state.layout_mod,
                is_free: (state) => state.init.is_free,
            }),
        },
        mounted() {
            this.$bus.$on("setQuestion", (val) => {
                this.ask = val;
                this.askchatgpt();
            });
            this.$bus.$on("newChat", () => {
                this.$refs.textarea.focus();
            });
        },
        beforeDestroy() {
            this.$bus.$off("setQuestion");
            this.$bus.$off("newChat");
        },
    };
</script>

<style scoped>
    .box {
        position: absolute;
        bottom: 20px;
        left: 50%;
        width: 100%;
        height: 50px;
        transform: translateX(-50%);
        z-index: 50;
    }

    .bottom {
        position: relative;
        height: 50px;
        min-height: 50px;
        width: 96%;
        max-width: 800px;
        margin: 0 auto;
    }

    .btm-cont {
        overflow: hidden;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        border: 1px solid var(--question-box-border-color);
        background-color: var(--question-box-background-color);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    }

    .hidden {
        color: transparent;
    }

    textarea {
        border: none;
        outline: none;
    }

    .input-box {
        float: left;
        position: relative;
        top: 0;
        width: calc(100% - 50px);
        height: 50px;
        min-height: 50px;
    }

    .input {
        overflow-y: auto;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        max-height: 140px;
        padding: 13px 20px 14px;
        line-height: 1.65em;
        font-family: Verdana;
        font-size: 14px;
        resize: none;
        color: var(--text-color);
        background-color: transparent;
    }

    .input::placeholder {
        color: var(--text-placeholder-color);
    }

    .send-box {
        position: absolute;
        right: 0;
        float: left;
        width: 50px;
        height: 100%;
    }

    .submit {
        position: absolute;
        overflow: hidden;
        display: flex;
        width: 50px;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .send {
        /* width: 50px; */
        /* height: 100%; */
        /* text-align: center; */
        position: absolute;
    }

    .send:after {
        content: "\e90d";
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 22px;
        line-height: 50px;
        color: var(--send-button-color);
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .free:before {
        content: "free";
        position: absolute;
        top: 3px;
        right: -45px;
        display: block;
        width: 80px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        background: linear-gradient(to right, #f56565, #f6ad55);
        color: #fff;
        font-size: 12px;
        transform: rotate(45deg) scale(0.85);
    }
</style>
<style scoped>
    .loading,
    .loading > div {
        position: relative;
        box-sizing: border-box;
    }

    .loading {
        display: block;
        font-size: 0;
        color: var(--tw-la-icon-color);
    }

    .loading > div {
        display: inline-block;
        float: none;
        background-color: currentColor;
        border: 0 solid currentColor;
    }

    .loading {
        width: 10px;
        height: 10px;
    }

    .loading > div {
        position: absolute;
        width: 10px;
        height: 10px;
        margin-left: -25px;
        border-radius: 100%;
        animation: ball-running-dots-animate 2s linear infinite;
    }

    .loading > div:nth-child(1) {
        animation-delay: 0s;
    }

    .loading > div:nth-child(2) {
        animation-delay: -0.4s;
    }

    .loading > div:nth-child(3) {
        animation-delay: -0.8s;
    }

    .loading > div:nth-child(4) {
        animation-delay: -1.2s;
    }

    .loading > div:nth-child(5) {
        animation-delay: -1.6s;
    }

    .loading > div:nth-child(6) {
        animation-delay: -2s;
    }

    .loading > div:nth-child(7) {
        animation-delay: -2.4s;
    }

    .loading > div:nth-child(8) {
        animation-delay: -2.8s;
    }

    .loading > div:nth-child(9) {
        animation-delay: -3.2s;
    }

    .loading > div:nth-child(10) {
        animation-delay: -3.6s;
    }

    .loading.la-sm {
        width: 4px;
        height: 4px;
    }

    .loading.la-sm > div {
        width: 4px;
        height: 4px;
        margin-left: -12px;
    }

    .loading.la-2x {
        width: 20px;
        height: 20px;
    }

    .loading.la-2x > div {
        width: 20px;
        height: 20px;
        margin-left: -50px;
    }

    .loading.la-3x {
        width: 30px;
        height: 30px;
    }

    .loading.la-3x > div {
        width: 30px;
        height: 30px;
        margin-left: -75px;
    }

    @keyframes ball-running-dots-animate {
        0%,
        100% {
            width: 100%;
            height: 100%;
            transform: translateY(0) translateX(500%);
        }

        80% {
            transform: translateY(0) translateX(0);
        }

        85% {
            width: 100%;
            height: 100%;
            transform: translateY(-125%) translateX(0);
        }

        90% {
            width: 200%;
            height: 75%;
        }

        95% {
            width: 100%;
            height: 100%;
            transform: translateY(-100%) translateX(500%);
        }
    }
</style>
