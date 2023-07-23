<template>
    <div class="box payment-index" :class="is_second ? 'second' : ''">
        <ul class="switch">
            <li @click="switchFirst">钱包充值</li>
            <li @click="switchSecond">包年包月</li>
        </ul>
        <div class="paygoods">
            <PaymentWallet
                v-show="!is_second"
                :display_info="display_wallet_info"
            />
            <PaymentWallet
                v-show="is_second"
                :display_info="display_member_info"
            />
        </div>
        <button class="submit" @click="submitPayment">确认支付</button>
        <span class="miss" @click="helpPayment">支付遇到问题</span>
    </div>
</template>

<script>
    import PaymentWallet from "@/components/payment/PaymentWallet";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "PaymentIndex",
        data() {
            return {
                is_second: false,
                wallet_info: {
                    title: "为您的钱包充值",
                    subtitle: "提问依量扣费，适合长期少量提问",
                },
                member_info: {
                    title: "购买会员",
                    subtitle: "购买限时会员，期间不限量提问",
                },
            };
        },
        components: { PaymentWallet },
        methods: {
            switchFirst() {
                this.is_second = false;
            },
            switchSecond() {
                this.is_second = true;
            },
            submitPayment() {
                this.$store.dispatch(
                    "modulePayment/calculatesign",
                    this.current_goods_id
                );
            },
            helpPayment() {
                window.open(this.$link.payment, "_blank");
            },
        },
        computed: {
            ...mapGetters("moduleUserinfo", ["user_wallet"]),
            ...mapState({
                wallet_goods: (state) => state.init.wallet_goods,
                member_goods: (state) => state.init.member_goods,
                current_goods_id: (state) => state.init.current_goods_id,
            }),
            display_wallet_info() {
                return {
                    ...this.wallet_info,
                    wallet: `（余额${this.user_wallet}）`,
                    goods: this.wallet_goods,
                    current: this.current_goods_id,
                };
            },
            display_member_info() {
                return {
                    ...this.member_info,
                    goods: this.member_goods,
                    current: this.current_goods_id,
                };
            },
        },
        created() {
            this.$store.dispatch("moduleUserinfo/requserwallet");
        },
    };
</script>

<style scoped>
    .payment-index {
        --first-color: #cee5ff;
        --second-color: #eee9e9;
    }
    .second {
        --first-color: #eee9e9;
        --second-color: #ffe6c1;
    }

    .paygoods {
        padding: 10px 8px;
        border-radius: 0 0 3px 3px;
        background-color: var(--first-color);
    }
    .second .paygoods {
        background-color: var(--second-color);
    }
    .switch {
        position: relative;
        width: 100%;
        height: 40px;
        /* 没选中 */
        /* --first-color: #eee9e9; */
        /* 选中 */
        /* --second-color: #c6e2ff; */
    }
    .switch > li {
        display: flex;
        position: absolute;
        top: 0;
        width: 50%;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 20px 20px 0 0;
        cursor: pointer;
    }

    .switch > li:nth-child(1) {
        left: 0;
        background-color: var(--first-color);
        z-index: 5;
    }

    .switch > li:nth-child(2) {
        right: 0;
        background-color: var(--second-color);
        z-index: 2;
    }

    .second .switch > li:nth-child(2) {
        z-index: 7;
    }

    .switch > li:nth-child(1):after,
    .switch > li:nth-child(2):after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 25px;
        width: 40px;
    }

    .switch > li:nth-child(1):after {
        right: -40px;
        background: radial-gradient(
            ellipse farthest-side at 100% 0,
            transparent 100%,
            var(--first-color) 0%
        );
    }

    .switch > li:nth-child(2):after {
        left: -40px;
        background: radial-gradient(
            ellipse farthest-side at 0% 0,
            transparent 100%,
            var(--second-color) 0%
        );
    }

    .submit {
        width: 100%;
        height: 40px;
        border-radius: 10px;
        margin-top: 10px;
        color: #fff;
        font-weight: 700;
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
            rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
        background-color: #03c158;
    }

    .miss {
        display: block;
        width: 100%;
        color: #1e90ff;
        font-size: 12px;
        margin-top: 10px;
        text-decoration: underline;
        text-align: center;
        cursor: pointer;
    }
</style>
<style>
    .goods-title {
        display: inline-block;
        font-size: 18px;
    }

    .goods-subtitle {
        font-size: 12px;
        font-weight: 200;
    }
</style>
