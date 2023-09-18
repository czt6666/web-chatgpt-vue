<template>
    <div v-show="show_token_popup">
        <div class="content">
            <span>{{ token }}</span>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "CopyToken",
        data() {
            return {
                token: "null",
            };
        },
        computed: {
            ...mapState({
                show_token_popup: (state) => state.show_popup.show_token_popup,
            }),
        },
        mounted() {
            this.$bus.$on("gettoken", (token) => {
                this.token = token;
            });
        },
    };
</script>

<style scoped>
    .content {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
    }
    .content span {
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
        word-break: break-word;
    }
</style>
