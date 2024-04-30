<template>
    <div>
        <div class="cont">
            <div class="switch-container" :class="model === 'gpt-4' ? 'active' : 'unactive'" @click="toggleSwitch">
                <div class="switch-posi">
                    <div class="switch-btn"></div>
                    <div class="text-cont">
                        <div class="modtext gpt3">GPT3.5</div>
                        <div class="modtext gpt4">GPT-4</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        data() {
            return {};
        },
        methods: {
            toggleSwitch() {
                this.$store.dispatch("moduleDialog/togglemodle");
                console.log(this.model);
            },
        },
        computed: {
            ...mapState({
                model: (state) => state.moduleDialog.model,
            }),
        },
    };
</script>

<style scoped>
    .cont {
        height: 48px;
        margin: -10px;
    }
    .switch-container {
        overflow: hidden;
        width: 100%;
        height: 48px;
        padding: 6px;
        background-color: var(--welcome-page-option-background-color);
        /* background-color: pink; */
        border-radius: 5px;
        cursor: pointer;
    }
    .switch-posi {
        position: relative;
    }
    .switch-btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 36px;
        border-radius: 5px;
        z-index: 10;
        transform: translateX(0);
        transition: all 0.2s;
        background-color: var(--welcome-modle-switch-default-background-color);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    .text-cont {
        width: 100%;
        display: flex;
    }
    .modtext {
        flex: 1;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        z-index: 20;
    }
    .active .gpt3 {
        color: var(--text-placeholder-color);
    }
    .unactive .gpt4 {
        color: var(--text-placeholder-color);
    }
    .active .switch-btn {
        transform: translateX(100%);
        background-color: var(--welcome-modle-switch-active-background-color);
    }
    .modtext:before {
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 14px;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-right: 3px;
    }
    .modtext.gpt3:before {
        content: "\e9a9";
    }
    .modtext.gpt4:before {
        content: "\e9b5";
    }
    .on .switch-button {
        background-color: var(--welcome-modle-switch-active-background-color);
    }
</style>
