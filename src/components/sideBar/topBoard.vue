<template>
    <div class="top">
        <ul>
            <dialogItem
                :info="{
                    title: 'New chat',
                    border: 1,
                    click: newChat,
                }"
            >
                <!-- 新建chat 头部icon -->
                <img src="@/assets/svg/add.svg" class="icon" alt="newChat" />
            </dialogItem>
        </ul>
        <vue-scroll :ops="ops" class="top-scroll">
            <ul>
                <dialogItem
                    v-for="(item, index) of display_session"
                    :key="index"
                    :info="{
                        title: item.title,
                        click: switchSession,
                        passdata: item,
                        current: is_current_session(item),
                    }"
                >
                    <!-- 会话列表 头部icon -->
                    <div @click="modifyFavorites(item.id)">
                        <img
                            src="@/assets/svg/dialog2.png"
                            class="icon"
                            v-show="!item.is_collect"
                        />
                        <img
                            src="@/assets/svg/dialog-collect.png"
                            class="icon"
                            v-show="item.is_collect"
                        />
                    </div>
                    <!-- 会话列表 尾部icon -->
                    <template v-slot:end>
                        <div
                            v-show="is_current_session(item)"
                            class="footer"
                            @click.stop="switchdelete()"
                        >
                            <img
                                src="@/assets/svg/trash.png"
                                v-show="!candelete"
                                class="trash icon"
                                alt="Delete"
                            />
                            <img
                                src="@/assets/svg/close.png"
                                v-show="candelete"
                                class="icon"
                                alt="Cancel"
                            />
                            <img
                                src="@/assets/svg/yes.svg"
                                v-show="candelete"
                                class="icon"
                                alt="Confirm"
                                @click="deleteSessionById(item)"
                            />
                        </div>
                    </template>
                </dialogItem>
            </ul>
        </vue-scroll>
    </div>
</template>

<script>
    import dialogItem from "@/components/sideBar/dialogItem";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "topBoard",
        components: { dialogItem },
        data() {
            return {
                ops: {
                    scrollPanel: {
                        scrollingX: false,
                        scrollingY: true,
                        speed: 300,
                    },
                    rail: {
                        background: "#01a99a",
                        size: "4px",
                        gutterOfSide: "0px",
                    },
                    bar: {
                        size: "4px",
                        keepShow: false,
                        background: "#c1c1c1",
                    },
                },
                candelete: 0,
            };
        },
        methods: {
            switchdelete() {
                this.candelete = !this.candelete;
            },
            // 判断这个 item 是否为 current session
            is_current_session(item) {
                // console.log(item);
                return item.id === this.current_session_id;
            },
            // 通过 ID 删除 session
            deleteSessionById(item) {
                this.$store.dispatch("moduleDialog/deletesession", item.id);
            },
            // 切换 session
            switchSession(info) {
                // 如果当前没选中 就切换
                if (!this.is_current_session(info.passdata)) {
                    // console.log("切换session", {...info.passdata});
                    this.$store.dispatch(
                        "moduleDialog/switchcurrentsessionid",
                        info.passdata.id
                    );
                }
            },
            // 新建一个 session
            newChat() {
                // 新建一个session
                this.$store.commit("moduleDialog/NEWCHAT");
                // 总线 让输入框focus
                this.$bus.$emit("newChat");
            },
            modifyFavorites(session_id) {
                this.$store.dispatch(
                    "moduleDialog/collectionsession",
                    session_id
                );
            },
        },
        computed: {
            ...mapState({
                current_session_id: (state) =>
                    state.moduleDialog.current_session_id,
                session: (state) => state.moduleDialog.session,
                all_session: (state) => state.moduleDialog.all_session,
            }),
            ...mapGetters({
                display_session: "moduleDialog/display_session",
            }),
        },
    };
</script>

<style scoped>
    .top {
        display: flex;
        flex-direction: column;
    }

    .top-scroll {
        overflow: hidden;
        flex: 1;
        width: 100%;
        margin-bottom: 8px;
    }

    .footer {
        margin: 0 10px 0 12px;
    }

    .footer img {
        width: 20px;
        height: 20px;
    }

    .icon {
        width: 24px;
        height: 24px;
    }
</style>
