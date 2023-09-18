<template>
    <div class="box">
        <!--输入框-->
        <div class="input-cont">
            <input
                type="text"
                class="input"
                v-model="inputvalue"
                :placeholder="info.title"
            />
            <button @click="pasteToken" class="paste">粘贴</button>
        </div>
        <!--控制按钮-->
        <div class="btn">
            <button @click="clearAll" class="clear">清空</button>
            <button @click="info.callback(inputvalue)" class="login">
                登录
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "LoginInput",
        data() {
            return {
                inputvalue: "",
            };
        },
        props: ["info"],
        methods: {
            // 粘贴函数
            pasteToken() {
                navigator.clipboard
                    .readText()
                    .then((text) => {
                        this.inputvalue = text;
                    })
                    .catch((error) => {
                        this.$message({
                            message: `自动粘贴失败，请您手动粘贴`,
                            type: "error",
                        });
                    });
            },
            clearAll() {
                this.inputvalue = "";
            },
        },
        computed: {
            ...mapGetters("moduleUserinfo", ["user_wallet"]),
        },
    };
</script>

<style scoped>
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input-cont {
        overflow: hidden;
        display: flex;
        width: 100%;
        height: 40px;
        border-radius: 8px;
        margin-top: 20px;
        border: 1px solid var(--border-color);
    }

    .input {
        flex: 1;
        height: 100%;
        padding-left: 18px;
        color: var(--text-color);
        background-color: transparent;
    }

    .paste {
        width: 15%;
        border-left: 1px solid var(--border-color);
        background-color: var(--border-color);
    }

    .btn {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
    }

    .btn button {
        height: 36px;
        width: 100px;
        font-size: 14px;
        border-radius: 50px;
        background-color: var(--border-color);
    }

    .btn .clear {
        color: var(--popup-light-font-color);
        background-color: var(--popup-clear-color);
    }

    .btn .login {
        margin-left: 10px;
        color: var(--popup-light-font-color);
        border: 1px solid transparent;
        background-color: var(--popup-confirm-color);
    }
</style>
