<template>
    <div v-show="show_more_options_popup">
        <div class="content" :class="layout_mod ? 'm' : ''">
            <ul class="side-bar">
                <li
                    v-for="item of side_bar"
                    :key="item"
                    @click="switchSidebar(item)"
                    :class="item == active_bar ? 'active' : ''"
                >
                    {{ item }}
                </li>
            </ul>
            <div class="main">
                <ul class="base-config" v-show="active_bar === '基础设置'">
                    <li>
                        <h4 class="switch-theme">切换主题</h4>
                        <div class="action elm-ui">
                            <el-switch
                                v-model="theme"
                                active-text="亮色"
                                inactive-text="暗色"
                                active-color="#4EEE94"
                                inactive-color="#696969"
                                @change="switchTheme"
                            >
                            </el-switch>
                        </div>
                    </li>
                    <li>
                        <h4 class="clear-all">删除未收藏记录</h4>
                        <div class="action">
                            <!-- 删除 -->
                            <div v-show="!can_clear">
                                <button class="btn clear" @click="switchClear">
                                    {{ clear_title[0] }}
                                </button>
                            </div>
                            <!-- 确认删除、取消删除 -->
                            <div v-show="can_clear">
                                <button class="btn clear" @click="clearAllSession">
                                    {{ clear_title[1] }}
                                </button>
                                <button class="btn cancle" @click="switchClear">
                                    {{ clear_title[2] }}
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="about" v-show="active_bar === '关于我们'">
                    <About />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import About from "@/components/popup/About";

    export default {
        name: "MoreOptions",
        components: { About },
        data() {
            return {
                side_bar: ["基础设置", "关于我们"],
                active_bar: "基础设置",
                can_clear: false,
                clear_title: ["清空对话", "确认清空", "取消清空"],
            };
        },
        computed: {
            ...mapState({
                show_more_options_popup: (state) => state.show_popup.show_more_options_popup,
                layout_mod: (state) => state.layout_mod,
            }),
            ...mapState(["theme"]),
        },
        methods: {
            switchTheme() {
                this.$store.commit("SWITCHTHEME");
            },
            switchSidebar(val) {
                this.active_bar = val;
            },
            clearAllSession() {
                this.$store.dispatch("moduleDialog/deleteunfavoritedsessions");
                this.can_clear = false;
            },
            switchClear() {
                this.can_clear = !this.can_clear;
            },
        },
    };
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 280px;
        padding: 0 40px;
        margin: 0 auto;
    }

    .m.content {
        padding: 0 5px;
        flex-direction: column;
    }

    .side-bar {
        display: flex;
        flex-direction: column;
        flex: 2;
        height: 100%;
        margin-right: 20px;
    }

    .m .side-bar {
        flex-direction: row;
        flex: 1;
    }

    .side-bar > li {
        width: 100%;
        height: 32px;
        line-height: 32px;
        border-radius: 5px;
        margin-bottom: 3px;
        text-align: center;
        cursor: pointer;
    }

    .side-bar .active {
        color: #fff;
        background-color: var(--popup-config-sidebar-active-background-color);
    }

    .main {
        flex: 5;
        height: 100%;
    }

    .base-config > li {
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
    }

    .base-config h4 {
        float: left;
        font-weight: normal;
    }

    .base-config .action {
        float: right;
        font-weight: normal;
    }

    .btn {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        margin-right: 5px;
    }
    .clear {
        color: #f3f3f3;
        background-color: var(--popup-clear-color);
    }
    .cancle {
        color: #f3f3f3;
        background-color: var(--popup-confirm-color);
    }
    .about {
        padding-top: 40px;
    }

    .side-bar li::before {
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-right: 3px;
        line-height: 32px;
    }
    .side-bar li:nth-child(1)::before {
        content: "\e929";
    }
    .side-bar li:nth-child(2)::before {
        content: "\e92d";
    }
</style>
<style>
    .elm-ui .el-switch__label {
        color: var(--text-colot);
    }
    .elm-ui .is-active {
        color: var(--popup-config-active-text-color);
    }
</style>
