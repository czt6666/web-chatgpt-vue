<template>
    <div class="box">
        <div
            class="card"
            :class="is_current ? 'current' : ''"
            @click="clickCallBack(info.id)"
        >
            <div class="corner" v-show="info.corner_text && is_current">
                {{ info.corner_text }}
            </div>
            <img
                src="../../assets/img/wx_pay_logo.png"
                alt=""
                class="wx-pay-logo"
            />
            <div class="middle">
                <span class="text">{{ info.title }}</span>
                <span class="text">{{ info.text }}</span>
            </div>
            <span class="value">{{ info.money }}元</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PaymentItem",
        props: ["info", "is_current", "clickCallBack"],
    };
</script>

<style scoped>
    .box {
        flex: 1;
    }
    .card {
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        width: 100%;
        height: 0;
        padding-top: 10px;
        padding-bottom: 120%;
        background-color: #f8f8f8;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
        cursor: pointer;
    }

    /* 卡片内容部分 */
    .wx-pay-logo {
        width: 30%;
        margin: 20px 0 15px;
    }
    .middle {
        position: absolute;
        top: 50%;
        transform: translateY(5%);
    }
    .text {
        display: block;
        line-height: 18px;
        font-size: 13px;
        text-align: center;
    }
    .value {
        position: absolute;
        bottom: 10px;
        margin-top: 5px;
        font-size: 18px;
        font-weight: 700;
    }

    /* 被选中的样式 */
    .card:hover,
    .current {
        outline: 1px solid #f6ad55;
    }
    .current:after {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 7px;
        height: 16px;
        border-radius: 2px;
        border-right: 3px solid #fff;
        border-bottom: 3px solid #fff;
        transform: rotate(45deg) translate(-7px, 3px);
    }
    .current:before {
        content: "";
        display: block;
        position: absolute;
        bottom: -25px;
        right: -25px;
        width: 50px;
        height: 50px;
        transform: rotate(45deg);
        background-color: #f6ad55;
    }
    .corner {
        position: absolute;
        top: 14px;
        right: -27px;
        width: 100px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        transform: rotate(45deg);
        background-color: #f6ad55;
    }
</style>
