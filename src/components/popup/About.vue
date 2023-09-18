<template>
    <div v-show="1">
        <div class="content">
            <img class="logo" src="../../assets/img/openai-2x-blue.png" />
            <h2 class="title">ChatGPT聊天</h2>
            <h3 class="versions">{{ $config.VERSION }}</h3>
            <div class="more">
                <a
                    :href="$link.android_app"
                    target="blank"
                    class="item"
                    download="ChatgptTalk.apk"
                >
                    获取APP
                </a>
                <a
                    href="https://support.qq.com/products/593071"
                    target="blank"
                    class="item"
                    >问题反馈</a
                >
                <a :href="$link.helpindex" target="blank" class="item"
                    >帮助中心</a
                >
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "About",
        computed: {
            ...mapState({
                show_about_popup: (state) => state.show_popup.show_about_popup,
            }),
        },
    };
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .content span {
        cursor: default;
    }

    .logo {
        width: 100px;
        height: 100px;
    }

    .title {
        padding-top: 14px;
        font-size: 20px;
        font-weight: 700;
    }

    .versions {
        padding-top: 0px;
        font-size: 12px;
        font-weight: 400;
    }

    .more {
        margin-top: 6px;
        border-top: 1px solid var(--text-color);
        border-bottom: 1px solid var(--text-color);
        color: var(--text-color);
    }

    .more .item {
        position: relative;
        line-height: 34px;
        padding: 0 13px;
        cursor: pointer;
    }

    .more .item:after {
        content: "";
        display: block;
        position: absolute;
        top: 7px;
        right: 0;
        height: 10px;
        width: 1px;
        background-color: var(--text-color);
    }

    .more .item:nth-last-child(1):after {
        display: none;
    }

    a {
        color: inherit;
    }
</style>
