<template>
    <div id="app" :class="themeColor">
        <router-view></router-view>
        <popupIndex />
    </div>
</template>

<script>
    import popupIndex from "@/components/popup/PopupIndex";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "App",
        components: { popupIndex },
        computed: {
            ...mapGetters(["themeColor"]),
        },
        mounted() {},
        created() {
            // 初始化
            this.$store.dispatch("moduleDialog/reqallsession");
            this.$store.dispatch("reqinitconfig");
            this.$store.dispatch("moduleUserinfo/requserallinfo");
            this.$store.dispatch("hitsindex");
            // 改变屏幕适配 和 html_font_size
            const width = document.body.clientWidth;
            this.$store.dispatch("adapt", width);
            window.addEventListener("resize", () => {
                const width = document.body.clientWidth;
                this.$store.dispatch("adapt", width);
            });
            // 改变网页title
            document.title = this.$config.html_title;
            // 设置不同的 favicon
            const link = document.createElement("link");
            link.rel = "icon";
            link.href = this.$config.rel_icon_href;
            const head = document.head || document.getElementsByTagName("head")[0];
            // 清除之前的 favicon
            const existingFavicons = head.querySelector('link[rel="icon"]');
            head.removeChild(existingFavicons);
            // 插入新的 favicon
            head.appendChild(link);
        },
    };
</script>

<style>
    #app {
        font-family: -apple-system, BlinkMacSystemFont, "Microsoft YaHei", sans-serif;
        font-size: 16px;
        color: var(--text-color);
        line-height: 1.75;
        background-color: var(--light-primary-color);
    }

    @font-face {
        font-family: "icomoon";
        src: url("./components/fonts/icomoon.eot?kikvbn");
        src: url("./components/fonts/icomoon.eot?kikvbn#iefix") format("embedded-opentype"),
            url("./components/fonts/icomoon.ttf?kikvbn") format("truetype"),
            url("./components/fonts/icomoon.woff?kikvbn") format("woff"),
            url("./components/fonts/icomoon.svg?kikvbn#icomoon") format("svg");
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }
</style>
