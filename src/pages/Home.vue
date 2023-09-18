<template>
    <div class="box pc">
        <main>
            <nav>
                <SideList />
            </nav>
            <section>
                <router-view></router-view>
            </section>
        </main>
    </div>
</template>

<script>
    import SideList from "@/components/home/pc/SideList";

    export default {
        name: "Home",
        components: { SideList },
        created() {
            this.$store.dispatch("moduleUserinfo/requserallinfo");
        },
    };
</script>

<!-- 作用于home页的局部样式 -->
<style>
    /* 承载main页面所有的内容 */
    .pc .infomation {
        width: 100%;
        padding: 0 40px 300px;
    }

    .mob .infomation {
        overflow: hidden;
        width: 100%;
        padding: 0 7px 80px;
    }

    .info-title {
        padding: 50px 0 25px;
        font-size: 18px;
        font-weight: 400;
    }

    .info-subtitle,
    .infomation .subtitle {
        padding-bottom: 5px;
        font-size: 15px;
        color: var(--homepage-subtitle-color);
        font-weight: 400;
    }

    .info-text,
    .info-item {
        padding-bottom: 28px;
    }

    .info-component {
        padding-bottom: 24px;
    }

    .info-tips,
    .infomation .tips {
        display: block;
        width: 100%;
        font-size: 12px;
        color: var(--homepage-notice-color);
        font-weight: 400;
    }

    .info-link-title {
        float: left;
    }

    .infomation .link {
        vertical-align: middle;
        color: var(--homepage-link-color);
        font-weight: 400;
    }

    .info-ol > li {
        list-style: square;
        margin-left: 22px;
    }

    .infomation .jump {
        display: block;
        width: 100%;
        font-size: 12px;
        color: var(--homepage-notice-color);
        font-weight: 400;
        cursor: pointer;
    }
</style>
<style scoped>
    main {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 100vh;
    }

    nav {
        width: 260px;
        height: 100vh;
    }

    section {
        overflow: auto;
        position: relative;
        flex: 1;
        width: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--light-primary-color);
    }
</style>
