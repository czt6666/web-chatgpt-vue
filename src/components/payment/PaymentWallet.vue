<template>
    <div class="box">
        <div>
            <h1 class="goods-title">{{display_info.title}}</h1>
            <span class="wallet">{{display_info.wallet}}</span>
        </div>
        <h3 class="goods-subtitle">{{display_info.subtitle}}</h3>
        <div class="paymentbox">
            <PatmentItem
                v-for="item of display_info.goods"
                :key="item.id"
                :info="item"
                :clickCallBack="changeCurrentGoods"
                :is_current="display_info.current == item.id"
            />
        </div>
    </div>
</template>

<script>
    import PatmentItem from "@/components/payment/PaymentItem";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "PaymentIndex",
        components: { PatmentItem },
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
