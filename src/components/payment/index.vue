<template>
    <div class="box payment-index" :class="is_second ? 'second' : ''">
        <ul class="switch">
            <li
                v-for="(item, index) of totle_goods"
                :key="index"
                @click="switchIndex(index)"
            >
                {{ item.title }}
            </li>
        </ul>
        <div class="paygoods">
            <PaymentWallet
                v-for="(item, i) of display_totle_info"
                :key="i"
                v-show="i == is_second"
                :display_info="item"
            />
        </div>
        <button class="submit" @click="submitPayment">确认支付</button>
        <div class="bind">
            <p>为了防止账号丢失，请在个人信息页绑定手机或邮箱再进行充值。</p>
        </div>
        <div class="miss">
            <span @click="helpPayment">支付遇到问题</span>
        </div>
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
                    subtitle: "提问依字数扣费，用于GPT4.0模型",
                    notice: "",
                },
                member_info: {
                    title: "购买会员",
                    subtitle: "会员期间，GPT3.5不限量提问",
                    notice: "",
                },
            };
        },
        components: { PaymentWallet },
        methods: {
            switchIndex(i) {
                this.is_second = Boolean(i);
            },
            submitPayment() {
                this.$store.dispatch(
                    "modulePayment/calculatesign",
                    this.current_goods_id
                );
            },
            helpCharge() {
                window.open(this.$link.charge, "_blank");
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
            totle_goods() {
                const totle_goods = [];
                if (this.wallet_goods) {
                    totle_goods.push({
                        title: "钱包充值",
                        ...this.wallet_goods,
                    });
                }
                if (this.member_goods) {
                    totle_goods.push({
                        title: "购买会员",
                        ...this.member_goods,
                    });
                }
                return totle_goods;
            },
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
            display_totle_info() {
                const display_totle_info = [];
                if (this.wallet_goods) {
                    display_totle_info.push(this.display_wallet_info);
                }
                if (this.member_goods) {
                    display_totle_info.push(this.display_member_info);
                }
                return display_totle_info;
            },
        },
        // onUpdated() {
        //     console.log(this.wallet_goods);
        //     if (this.wallet_goods.length !== 0) {
        //         totle_goods[0] = this.wallet_goods;
        //     }
        //     if (this.member_goods.length !== 0) {
        //         totle_goods[1] = this.member_goods;
        //     }
        // },
        created() {
            this.$store.dispatch("moduleUserinfo/requserwallet");
        },
    };
</script>

<style scoped>
    .payment-index {
        --current-panel-color: var(--payment-page1-color);
        --unselected-panel-color: var(--payment-none-color);
    }

    .payment-index.second {
        --current-panel-color: var(--payment-page2-color);
        --unselected-panel-color: var(--payment-none-color);
    }

    /* 主要颜色 */
    .paygoods {
        padding: 10px 8px;
        border-radius: 0 0 3px 3px;
        background-color: var(--current-panel-color);
    }

    .switch {
        position: relative;
        width: 100%;
        height: 40px;
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

    /* 切换按钮 */
    .switch > li:nth-child(1) {
        left: 0;
        background-color: var(--current-panel-color);
        z-index: 5;
    }

    .second .switch > li:nth-child(1) {
        left: 0;
        background-color: var(--unselected-panel-color);
        z-index: 5;
    }

    .switch > li:nth-child(2) {
        right: 0;
        background-color: var(--unselected-panel-color);
        z-index: 2;
    }

    .second .switch > li:nth-child(2) {
        right: 0;
        background-color: var(--current-panel-color);
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

    /* 圆角 */
    .switch > li:nth-child(1):after {
        right: -40px;
        background: radial-gradient(
            ellipse farthest-side at 100% 0,
            transparent 100%,
            var(--current-panel-color) 0%
        );
    }

    .second .switch > li:nth-child(1):after {
        right: -40px;
        background: radial-gradient(
            ellipse farthest-side at 100% 0,
            transparent 100%,
            var(--unselected-panel-color) 0%
        );
    }

    .switch > li:nth-child(2):after {
        left: -40px;
        background: radial-gradient(
            ellipse farthest-side at 0% 0,
            transparent 100%,
            var(--unselected-panel-color) 0%
        );
    }

    .second .switch > li:nth-child(2):after {
        left: -40px;
        background: radial-gradient(
            ellipse farthest-side at 0% 0,
            transparent 100%,
            var(--current-panel-color) 0%
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
        position: relative;
        display: block;
        width: 100%;
        color: #1e90ff;
        font-size: 12px;
        margin-top: 10px;
        text-decoration: underline;
        text-align: center;
    }

    .miss span {
        cursor: pointer;
        margin: 0 5px;
    }

    .bind {
        text-align: center;
        color: #ff3030;
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
