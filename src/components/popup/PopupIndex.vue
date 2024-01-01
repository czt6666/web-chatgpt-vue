<template>
    <div class="box">
        <div class="bg" @click.self="closeAllPopup" v-show="show_all_popu">
            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeIn"
                class="custom-transition"
            >
                <div class="popup" v-show="show_all_popu">
                    <div class="close" @click="closeAllPopup">
                        <i class="close-icon"></i>
                    </div>
                    <!-- ... -->
                    <!-- <About /> -->
                    <Payment />
                    <Login />
                    <CopyToken />
                    <Collect />
                    <MoreOption />
                    <SystemOptions />
                    <Gpt4Notice />
                    <SystemDescribe />
                    <Notice />
                    <!-- ... -->
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import About from "@/components/popup/About";
    import Payment from "@/components/popup/Payment";
    import Login from "@/components/popup/Login";
    import CopyToken from "@/components/popup/CopyToken";
    import Collect from "@/components/popup/Collect";
    import MoreOption from "@/components/popup/MoreOptions";
    import SystemOptions from "@/components/popup/SystemOptions";
    import Gpt4Notice from "@/components/popup/Gpt4Notice";
    import SystemDescribe from "@/components/popup/SystemDescribe";
    import Notice from "@/components/popup/Notice";
    import { mapGetters } from "vuex";

    export default {
        name: "PopupIndex",
        components: {
            About,
            Payment,
            Login,
            CopyToken,
            Collect,
            MoreOption,
            SystemOptions,
            Gpt4Notice,
            SystemDescribe,
            Notice,
        },
        computed: {
            ...mapGetters(["show_all_popu"]),
        },
        methods: {
            closeAllPopup() {
                this.$store.commit("CHANG_ALL_POPUP", false);
            },
        },
    };
</script>

<style scoped>
    .bg {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        z-index: 99;
        background-color: var(--popup-background-color);
    }

    .popup {
        position: relative;
        top: -3%;
        width: 100%;
        max-width: 750px;
        padding: 70px 10px;
        margin: 0 5px;
        border-radius: 10px;
        background-color: var(--popup-color);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        z-index: 1000;
    }

    .close {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        /* background-color: pink; */
    }

    .close i:after {
        content: "\e90f";
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 26px;
        text-align: center;
        line-height: 40px;
        color: var(--icon-color);
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .custom-transition {
        transition-duration: 0.2s; /* 设置过渡持续时间为 5 秒 */
    }
</style>
