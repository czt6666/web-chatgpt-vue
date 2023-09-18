<template>
    <div class="box">
        <div class="collect" v-show="is_newuser && show_collect">
            ⚠️ 为防止丢失，请收藏本网站
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
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: var(--welcome-page-collect-background-color);
    }

    .hidden {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        height: 40px;
        line-height: 40px;
        margin-right: 30px;
        font-size: 16px;
        text-decoration: underline;
        cursor: pointer;
        color: var(---link-color);
    }
</style>
