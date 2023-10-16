<template>
    <div class="box">
        <div class="content">
            <div></div>
            <div class="middle">
                <h2 class="model-title">{{ display_model }}</h2>
                <span
                    class="system"
                    @click="showSystemDescribe"
                    v-show="curr_session_system"
                ></span>
            </div>
            <Collection />
        </div>
    </div>
</template>

<script>
    import Collection from "@/components/dialog/Collection";
    import { mapGetters } from "vuex";

    export default {
        name: "TopModleInfo",
        components: { Collection },
        computed: {
            ...mapGetters("moduleDialog", [
                "curr_session_model",
                "curr_session_system",
            ]),
            display_model() {
                if (this.curr_session_model === "gpt-3.5-turbo") {
                    return "GPT-3.5";
                } else if (this.curr_session_model === "gpt-3.5-turbo-16k") {
                    return "GPT-3.5-16K";
                } else if (this.curr_session_model === "gpt-4") {
                    return "GPT-4";
                } else {
                    return "未知";
                }
            },
        },
        methods: {
            showSystemDescribe() {
                this.$store.commit("CHANG_SYSTEM_DESCRIBE_POPUP", true);
            },
        },
    };
</script>

<style scoped>
    .content {
        display: flex;
        width: 100%;
        height: 52px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }

    .middle {
        display: flex;
        align-items: center;
    }

    .model-title {
        font-size: 16px;
        font-weight: normal;
        text-align: center;
    }

    .system::before {
        content: "\e90e";
        display: inline-block;
        width: 20px;
        height: 20px;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 16px;
        line-height: 20px;
        margin-left: 4px;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        cursor: pointer;
    }
</style>
