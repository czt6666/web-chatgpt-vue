<template>
    <div v-show="show_collect_popup">
        <div class="content">
            <h2 class="title">支付成功</h2>
            <ul class="shema">
                <li>请收藏网站，避免走丢</li>
                <li>请绑定手机号或邮箱，避免账号丢失</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Collect",
        computed: {
            ...mapState({
                show_collect_popup: (state) =>
                    state.show_popup.show_collect_popup,
            }),
        },
        methods: {
            // http://localhost:8080/#/?money=5.00&app_id=10037&subject=ChatGPT%E9%92%B1%E5%8C%85%E5%85%85%E5%80%BC5.00%E5%85%83&user_id=1&extra=x0500&pay_type=wx&order_no=UID%3A1__NXk1VMYw&sign=13a309858401c5ac602d902828957078
        },
        mounted() {
            // 监听URL的变化
            window.addEventListener(
                "hashchange",
                function () {
                    const url = window.location.href;
                    // 解析查询参数
                    const queryStartIndex = url.indexOf("?");
                    const query = url.slice(queryStartIndex + 1);
                    const params = new URLSearchParams(query);
                    const orderNo = params.get("order_no");
                    // 检查是否存在order_no
                    console.log(orderNo);
                    if (orderNo) {
                        // 开启弹窗
                        this.$store.commit("CHANG_COLLECT_POPUP", true);
                    }
                }.bind(this)
            );
        },
    };
</script>

<style scoped>
    .content {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
    }
    .title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .shema li {
        list-style: disc;
        margin-left: 20px;
    }
</style>
