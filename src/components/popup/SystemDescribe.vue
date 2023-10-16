<template>
    <div v-show="show_system_describe_popup">
        <div class="content">
            <h2 class="title">对话预设：</h2>
            <div class="text">
                <p>
                    {{ curr_session_system }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "SystemDescribe",
        computed: {
            ...mapState({
                show_system_describe_popup: (state) =>
                    state.show_popup.show_system_describe_popup,
            }),
            ...mapGetters("moduleDialog", ["curr_session_system"]),
        },
    };
</script>

<style scoped>
    .content {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .text {
        width: 100%;
        min-height: 200px;
        border-radius: 5px;
        padding: 20px 12px;
        background-color: #e4e4e4;
    }
</style>
