<template>
    <div v-show="show_gpt4_notice_popup">
        <div class="content">
            <h2 class="title">GPT4使用需知</h2>
            <ul class="notice-list">
                <li>GPT4为付费模型</li>
                <li>
                    GPT4的使用费用较高，请谨慎使用，具体收费详情如下。
                    <img src="../../assets/img/charge-gpt4.jpg" alt="模型收费表" class="chargelist" />
                    <p class="middle">估算仅供参考，按一个问答总共900字计算</p>
                </li>
            </ul>
            <el-checkbox class="notshow" v-model="not_show_again" @change="dismissNotification">不再提示 </el-checkbox>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Gpt4Notice",
        data() {
            return {
                not_show_again: false,
            };
        },
        methods: {
            dismissNotification() {
                // 将"不再提示"状态存储在localStorage中
                localStorage.setItem("gpt4_usage_notice_popup_disabled", this.not_show_again);
            },
        },
        computed: {
            ...mapState({
                show_gpt4_notice_popup: (state) => state.show_popup.show_gpt4_notice_popup,
            }),
        },
    };
</script>

<style scoped>
    .content {
        width: 100%;
        max-width: 560px;
        margin: -30px auto -25px;
    }

    .title {
        padding-top: 14px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 10px;
    }

    ul.notice-list li {
        list-style-type: disc; /* 设置列表项前面的标志为实心圆点 */
        margin-left: 20px; /* 设置左边距 */
    }

    ul.notice-list li {
        margin-bottom: 10px; /* 设置每个列表项之间的下边距 */
    }

    .chargelist {
        display: block;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        border: 1px solid #ccc;
    }
    .middle {
        text-align: center;
    }
    .notshow {
        display: block;
        text-align: center;
        color: var(--text-placeholder-color);
        margin-bottom: -10px;
    }
</style>
