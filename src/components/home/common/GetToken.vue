<template>
    <div class="box2">
        <div class="token-box" @click="copyToken">
            <b>
                {{ token }}
            </b>
            <i></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GetToken",
        methods: {
            copyToken() {
                navigator.clipboard
                    .writeText(this.token)
                    .then(() => {
                        this.$message({
                            message: "复制成功",
                            type: "success",
                        });
                    })
                    .catch((error) => {
                        this.$message({
                            message: `复制失败，请您手动复制`,
                            type: "error",
                        });
                        // 传递token
                        this.$bus.$emit("gettoken", this.token);
                        // 展示token弹窗
                        this.$store.commit("CHANG_TOKEN_POPUP", true);
                    });
            },
        },
        computed: {
            token() {
                const token =
                    localStorage.getItem(this.$config.TOKEN_KEY) || "";
                return token.substring(7);
            },
        },
    };
</script>

<style scoped>
    .token-box {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        max-width: 650px;
    }

    .token-box span {
        display: inline-block;
        height: 30px;
        text-align: right;
    }

    .token-box b {
        overflow: hidden;
        flex: 1;
        height: 30px;
        color: var(--text-color);
        text-overflow: ellipsis;
        text-wrap: nowrap;
        border-radius: 5px;
        cursor: pointer;
    }

    .token-box i {
        display: block;
        width: 30px;
        height: 30px;
        float: right;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }

    .token-box i::before {
        content: "\e91b";
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: inherit;
        /* color: #10aeec; */
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
