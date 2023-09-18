<template>
    <div>
        <ul class="title-box">
            <li
                v-for="(item, index) of models"
                :key="index"
                :class="item.value === cur_model ? 'current' : ''"
                @click="changeModel(item)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Model",
        data() {
            return {
                models: [
                    { name: "GPT3.5", value: "gpt-3.5-turbo" },
                    { name: "GPT4", value: "gpt-4" },
                    // { name: "GPT3.5-16k", value: "gpt-3.5-turbo-16k" },
                ],
            };
        },
        computed: {
            ...mapState({
                cur_model: (state) => state.moduleDialog.model,
            }),
        },
        methods: {
            changeModel(info) {
                // 更改modle
                this.$store.commit("moduleDialog/CHANGEMEDEL", info.value);
                if (info.value === "gpt-4") {
                    // 提示GPT4费用高
                    this.$message({
                        type: "success",
                        message: "此模型价格为gpt3.5的30倍！",
                    });
                }
            },
        },
    };
</script>

<style scoped>
    .title-box {
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;
        width: 100%;
        max-width: 350px;
        margin: 0 auto 10px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
            rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }

    .title-box li {
        display: flex;
        flex: 1;
        height: 100%;
        align-items: center;
        justify-content: center;
        background-color: var(--welcome-page-option-background-color);
        cursor: pointer;
    }

    .title-box li:nth-child(1) {
        border-left: none;
    }

    .title-box .current {
        color: var(--sidebar-text-color);
        background-color: var(--dark-primary-color);
    }
</style>
