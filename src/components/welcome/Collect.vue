<template>
    <div class="box">
        <div class="collect" v-show="is_newuser && show_collect">
            <span class="tip">⚠️ 为防止丢失，请收藏本网站 </span>
            <span class="hidden" @click="hideCollect">不再显示</span>
        </div>
    </div>
</template>

<script>
    const hiddenStorageName = "gpt3-hidden-welecome-collect";
    export default {
        name: "Collect",
        data() {
            return {
                is_newuser: true,
                show_collect: true,
            };
        },
        methods: {
            hideCollect() {
                this.show_collect = false;
                localStorage.setItem(hiddenStorageName, "false");
            },
        },
        created() {
            const show_collect = localStorage.getItem(hiddenStorageName);
            if (show_collect === "false") {
                this.show_collect = false;
            }
        },
    };
</script>

<style scoped>
    .collect {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background-color: var(--welcome-page-collect-background-color);
    }
    .tip {
        display: block;
        width: 100%;
        white-space: nowrap;
        text-align: center;
    }
    .hidden {
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        text-decoration: underline;
        white-space: nowrap;
        margin-right: 10px;
        margin-left: 10px;
        cursor: pointer;
        color: var(---link-color);
    }
    @media screen and (max-width: 400px) {
        .hidden {
            position: unset;
        }
    }
</style>
