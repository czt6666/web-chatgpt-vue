<template>
    <div class="box">
        <div>
            <h1 class="goods-title">{{ display_info.title }}</h1>
            <span class="wallet">{{ display_info.wallet }}</span>
        </div>
        <h3 class="goods-subtitle">{{ display_info.subtitle }}</h3>
        <div class="paymentbox">
            <PatmentItemPro
                v-for="item of display_info.goods"
                :key="item.id"
                :info="item"
                :size="itemsize"
                :clickCallBack="changeCurrentGoods"
                :is_current="display_info.current == item.id"
            />
        </div>
        <h3 class="goods-subtitle">{{ display_info.notice }}</h3>
    </div>
</template>

<script>
    import PatmentItemPro from "@/components/payment/PaymentItemPro";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "PaymentIndex",
        components: { PatmentItemPro },
        props: ["display_info"],
        data() {
            return {};
        },
        methods: {
            changeCurrentGoods(id) {
                this.$store.commit("CHANGE_GOODS_ID", id);
            },
        },
        computed: {
            ...mapGetters("moduleUserinfo", ["user_wallet"]),
            ...mapState(["layout_mod"]),
            itemsize() {
                if (this.layout_mod) {
                    return "small";
                } else {
                    return "large";
                }
            },
        },
    };
</script>

<style scoped>
    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wallet {
        display: inline-block;
        font-size: 12px;
        font-weight: 400;
    }

    .paymentbox {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 10px;
        margin-top: 10px;
    }
</style>
