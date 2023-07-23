<template>
    <div class="box">
        <div class="content">
            <div
                class="item prev"
                @click="toPrevPage"
                v-show="info.prev.name !== ''"
            >
                <span>上一页</span>
                <h4>{{ info.prev.name }}</h4>
            </div>
            <div
                class="item next"
                @click="toNextPage"
                v-show="info.next.name !== ''"
            >
                <span>下一页</span>
                <h4>{{ info.next.name }}</h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SwitchPage",
        props: ["info"],
        methods: {
            toPrevPage() {
                this.$store.dispatch("changerouter", this.info.prev.router);
            },
            toNextPage() {
                this.$store.dispatch("changerouter", this.info.next.router);
            },
        },
    };
</script>

<style scoped>
    .box {
        min-height: 100px;
    }
    .content {
        position: relative;
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 40px;
    }
    .item {
        position: absolute;
        top: 0;
        width: 49%;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #ccc;
        transition: border-color 0.3s ease;
        cursor: pointer;
    }
    .item:hover {
        transition: border-color 0.3s ease;
        border: 1px solid #43cd80;
    }
    .item h4 {
        color: #43cd80;
    }
    .prev {
        left: 0;
    }
    .next {
        right: 0;
        text-align: right;
    }
</style>
