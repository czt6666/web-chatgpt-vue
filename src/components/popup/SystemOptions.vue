<template>
    <div v-show="show_system_options_popup">
        <div class="content">
            <vue-scroll :ops="ops">
                <div class="option-cont">
                    <h2 class="title"></h2>
                    <div
                        class="option-box"
                        v-for="(item, index) of options"
                        :key="index"
                    >
                        <h3 class="option-title">{{ index }}</h3>
                        <ul class="grid option-ul">
                            <li
                                v-for="(content, idx) of item"
                                :key="idx"
                                :class="
                                    [length, tool, tone, random_tone].includes(
                                        content.value
                                    )
                                        ? 'cont-current'
                                        : ''
                                "
                                @click="changeOption(content)"
                            >
                                {{ content.value }}
                            </li>
                        </ul>
                    </div>
                </div>
            </vue-scroll>
            <div class="btm">
                <button class="button" @click="closeSystemPopup">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "SystemOptions",
        data() {
            return {
                options: {
                    "⚙️ 选择情景应用": [
                        { value: "文生图", type: "tool" },
                        { value: "变量命名", type: "tool" },
                        { value: "函数命名", type: "tool" },
                        { value: "马克思哲学家", type: "tool" },
                        { value: "激励教练", type: "tool" },
                        { value: "花哨的标题生成器", type: "tool" },
                    ],
                    "🎯 调整回答长度": [
                        { value: "最简回答", type: "length" },
                        { value: "多举例子", type: "length" },
                        { value: "论文模式", type: "length" },
                    ],
                    "🎨 设置聊天语气": [
                        { value: "派蒙风格", type: "tone" },
                        { value: "猫娘风格", type: "tone" },
                        { value: "随机风格", type: "random_tone" },
                    ],
                },
                ops: {
                    scrollPanel: {
                        scrollingX: false,
                        scrollingY: true,
                        speed: 300,
                    },
                    bar: {
                        keepShow: false,
                        background: "#c1c1c1",
                    },
                },
            };
        },
        computed: {
            ...mapState({
                show_system_options_popup: (state) =>
                    state.show_popup.show_system_options_popup,
                length: (state) => state.moduleDialog.system_describe.length,
                tone: (state) => state.moduleDialog.system_describe.tone,
                tool: (state) => state.moduleDialog.system_describe.tool,
                random_tone: (state) =>
                    state.moduleDialog.system_describe.random_tone,
            }),
        },
        methods: {
            changeOption(option) {
                this.$store.commit("moduleDialog/FIXSYSTEMOPTION", option);
            },
            closeSystemPopup() {
                this.$store.commit("CHANG_SYSTEM_OPTIONS_POPUP", false);
            },
        },
    };
</script>

<style scoped>
    .content {
        width: 100%;
        height: 50vh;
        max-width: 640px;
        margin: -5px auto 0;
    }
    .option-cont {
        padding-right: 15px;
    }
    .title {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
    }
    .option-title {
        font-size: 18px;
        font-weight: 400;
    }
    .option-box {
        margin-bottom: 15px;
    }
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; /* 使用三列布局 */
        gap: 10px; /* 列之间的间隔 */
        list-style: none;
        padding: 0;
    }

    .grid li {
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        background-color: var(--welcome-popup-option-background-color);
        cursor: pointer;
    }
    .grid li.cont-current {
        background-color: var(--welcome-popup-option-select-background-color);
    }

    .btm {
        /* border-top: 1px solid #000; */
    }
    .button {
        width: 150px;
        height: 32px;
        border-radius: 5px;
        margin: 15px 15px -20px 0;
        float: right;
        color: var(--popup-light-font-color);
        background-color: var(--popup-confirm-color);
    }
</style>
