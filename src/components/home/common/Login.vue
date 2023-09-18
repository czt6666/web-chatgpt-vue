<template>
    <div class="box">
        <button
            class="login"
            :style="{ backgroundColor: info.color }"
            @click="showLoginPopup"
        >
            {{ info.title }}
        </button>
    </div>
</template>

<script>
    export default {
        name: "Account",
        props: ["info"],
        methods: {
            showLoginPopup() {
                // 打开弹窗
                this.$store.commit("CHANG_LOGIN_POPUP", true);
                // 全局事件总线 传递找回方式
                this.$bus.$emit("recoverWays", this.info.ways);
            },
        },
    };
</script>

<style scoped>
    .login {
        display: block;
        width: 350px;
        height: 40px;
        color: #f3f3f3;
        background: #ff4040;
        border-radius: 5px;
    }
</style>
