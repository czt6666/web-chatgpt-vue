<template>
    <div class="box">
        <ul>
            <!-- 返回主页 -->
            <dialogItem
                class="side-item"
                :info="{
                    title: backtitle,
                    click: backHome,
                }"
            >
                <!-- 头部 icon-->
                <img src="@/assets/svg/back.png" />
            </dialogItem>
            <!-- 分割线 -->
            <li class="break"></li>
            <!-- 列表 -->
            <dialogItem
                v-for="item of sidelist"
                :key="item.path"
                class="side-item"
                :class="{ current: sub_path === item.path }"
                :info="{
                    ...item,
                    click: changeRouter,
                }"
            >
                <!-- 头部 icon-->
                <img :src="'https://czt666.cn/gpt/img/' + item.url" />
            </dialogItem>
        </ul>
    </div>
</template>

<script>
    import SideItem from "@/components/home/pc/SideItem";
    import dialogItem from "@/components/sideBar/dialogItem";

    export default {
        name: "SideList",
        components: { SideItem, dialogItem },
        data() {
            return {
                backtitle: "返回主页",
                sidelist: [
                    {
                        title: "个人信息",
                        path: "/home", // 不可以删斜杠
                        url: "user1.png",
                    },
                    {
                        title: "钱包信息",
                        path: "/home/wallet",
                        url: "wallet.png",
                    },
                    {
                        title: "账号信息",
                        path: "/home/account",
                        url: "account.png",
                    },
                    {
                        title: "帮助反馈",
                        path: "/home/help",
                        url: "help.png",
                    },
                ],
            };
        },
        methods: {
            changeRouter(info) {
                this.$store.dispatch("changerouter", info.path);
                // 关闭侧边栏
                this.$store.commit("CHANG_SIDEBAR", 0);
            },
            backHome() {
                this.$store.dispatch("changerouter", "/");
                // 关闭侧边栏
                this.$store.commit("CHANG_SIDEBAR", 0);
            },
        },
        computed: {
            sub_path() {
                const currentPath = this.$route.path;
                const sub_path = currentPath.replace(/^\/m/, "");
                return sub_path;
            },
        },
    };
</script>

<style scoped>
    .box {
        width: 100%;
        height: 100%;
        padding: 8px;
        background-color: #202123;
    }

    .break {
        width: 95%;
        height: 1px;
        margin: 8px auto 15px;
        background-color: #e4e4e4;
    }

    .side-item img {
        width: 24px;
        height: 24px;
    }
</style>
