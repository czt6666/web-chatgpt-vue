<template>
    <div v-show="show_notice_popup">
        <div class="content">
            <div class="nitice">
                <h2 class="title">{{ nitice_info.title }}</h2>
                <p class="name">{{ nitice_info.name }}</p>
                <div class="notice-list">
                    <p v-for="(item, i) of nitice_info.content" :key="i">
                        {{ item }}
                    </p>
                </div>
                <p class="date">{{ nitice_info.date }}</p>
            </div>
            <div class="control btn">
                <button @click="closeNotice" class="close">不再提示</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from "vuex";

    export default {
        name: "Notice",
        computed: {
            ...mapState({
                show_notice_popup: (state) =>
                    state.show_popup.show_notice_popup,
            }),
            ...mapGetters(["nitice_info"]),
        },
        methods: {
            closeNotice() {
                this.$store.dispatch(
                    "noticeviewedbyuser",
                    this.nitice_info.tag
                );
            },
        },
    };
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 560px;
        margin: 0 auto;
    }

    .content span {
        cursor: default;
    }

    .title {
        padding-top: 14px;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
    }

    .notice-list p {
        text-indent: 2em;
    }
    .date {
        margin-top: 20px;
        text-align: right;
    }

    /* 按钮部分 */
    .btn {
        display: flex;
        justify-content: end;
        width: 100%;
        margin-top: 20px;
        margin-bottom: -10px;
    }

    .btn button {
        height: 36px;
        width: 100px;
        font-size: 14px;
        border-radius: 8px;
        background-color: var(--border-color);
    }

    .btn .close {
        margin-left: 10px;
        color: var(--popup-light-font-color);
        border: 1px solid transparent;
        background-color: var(--popup-confirm-color);
    }
</style>
