<template>
    <div class="box">
        <div
            class="input"
            v-show="can_fix_name"
            :class="startfixname ? 'blue-border' : ''"
        >
            <input
                type="text"
                class="text"
                ref="input"
                :placeholder="info.plac"
                v-model="input_contnet"
                @focus="startFixName"
                @blur="notFixName"
            />
            <i class="commit" @click="notFixName"></i>
        </div>
        <div class="display" v-show="!can_fix_name">
            <span class="name">{{ info.cont }}</span>
            <i class="fix" @click="fixName"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SingleLineInput",
        props: {
            info: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                have_name_and_fix: false,
                startfixname: false,
                input_contnet: this.info.cont,
            };
        },
        methods: {
            // 展示为可以修改的形态
            fixName() {
                this.have_name_and_fix = true;
            },
            startFixName() {
                this.startfixname = true;
            },
            // 完成修改昵称
            notFixName() {
                this.have_name_and_fix = false;
                this.startfixname = false;
                // 如果输入框不为空，且内容和以前不一样 就修改昵称
                if (
                    this.input_contnet !== "" &&
                    this.input_contnet !== this.info.cont
                ) {
                    // 修改昵称
                    this.info.onfixed(this.input_contnet);
                }
            },
        },
        computed: {
            can_fix_name() {
                // 如果昵称为空 则可以修改
                if (!this.info.cont) {
                    return true;
                }
                // 如果要修改 则可以修改
                return this.have_name_and_fix;
            },
        },
    };
</script>

<style scoped>
    .box {
        height: 100%;
        width: 100%;
    }

    .input {
        overflow: hidden;
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid #e4e4e4;
        background-color: #f3f3f3;
        /* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px; */
    }

    .input:hover,
    .blue-border {
        outline: 1px solid #03c158;
    }

    .text {
        height: 100%;
        width: 85%;
        color: #000;
        padding: 0 12px 0;
        vertical-align: top;
        background-color: transparent;
    }

    .commit {
        display: block;
        height: 100%;
        width: 15%;
        float: right;
        border-left: 1px dashed #ccc;
        /* background-color: pink; */
    }

    .commit::before {
        content: "\e91e";
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 16px;
        color: #01c056;
        text-align: center;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        cursor: pointer;
    }

    .display {
        width: 100%;
        height: 100%;
    }

    .name {
        float: left;
        vertical-align: top;
    }

    .fix {
        display: block;
        height: 100%;
        width: 15%;
        float: right;
        border-radius: 3px;
        /* 让修改符号居于底部 */
        padding-bottom: 3px;
    }

    .fix::before {
        content: "\e922";
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: end;
        width: 100%;
        height: 100%;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 14px;
        color: #333333;
        text-align: center;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        cursor: pointer;
    }
</style>
