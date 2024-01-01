<template>
    <div class="infomation">
        <h2 class="info-title">帮助与反馈</h2>
        <ul>
            <li class="info-item">
                <h3 class="subtitle">支付问题</h3>
                <a class="link" :href="$link.payment">{{ $link.payment }}</a>
            </li>
            <li class="info-item">
                <h3 class="subtitle">账号问题</h3>
                <a class="link" :href="$link.account">{{ $link.account }}</a>
            </li>
            <li class="info-item">
                <h3 class="subtitle">更多产品</h3>
                <a class="link" :href="$link.product">{{ $link.product }}</a>
            </li>
            <li class="info-item">
                <h3 class="subtitle">意见反馈</h3>
                <a class="link" :href="$link.propose">{{ $link.propose }}</a>
            </li>
        </ul>
        <SwitchPage :info="context" />
    </div>
</template>

<script>
    import SwitchPage from "@/components/home/common/SwitchPage";

    export default {
        name: "Help",
        components: { SwitchPage },
        data() {
            return {
                context: {
                    prev: {
                        name: "账号信息",
                        router: "/home/account",
                    },
                    next: {
                        name: "",
                        router: "",
                    },
                },
            };
        },
    };
</script>

<style scoped></style>
