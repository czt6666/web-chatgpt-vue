<template>
    <ul class="bottom">
        <!-- 账号信息 -->
        <dialogItem
            :info="{
                title: '账号信息',
                notice: check_user_bind,
                click: this.changeRouterHome,
            }"
        >
            <!-- 头部 icon-->
            <img src="@/assets/svg/user.png" class="icon" alt="Your" />
        </dialogItem>
        <!-- 更多选项 -->
        <dialogItem
            :info="{
                title: '更多选项',
                click: this.showOptionPopup,
                mystyle: 'marginBottom: 0px',
            }"
        >
            <img
                src="@/assets/svg/option.png"
                v-show="!can_select_style"
                alt="Options"
            />
        </dialogItem>
        <!--        &lt;!&ndash;更多选项 开始按钮&ndash;&gt;-->
        <!--        <div-->
        <!--            :style="{ border: can_select_style ? '1px solid #4c4d4f' : 'none' }"-->
        <!--            class="border"-->
        <!--        >-->
        <!--            <dialogItem-->
        <!--                :info="{-->
        <!--                    title: can_select_style ? '收起列表' : '更多选项',-->
        <!--                    current: can_select_style,-->
        <!--                    click: this.showSessionStyle,-->
        <!--                    mystyle: 'marginBottom: 0px',-->
        <!--                }"-->
        <!--            >-->
        <!--                <img src="@/assets/svg/option.png" v-show="!can_select_style" />-->
        <!--                <img src="@/assets/svg/down.svg" v-show="can_select_style" />-->
        <!--            </dialogItem>-->

        <!--            &lt;!&ndash;    可选聊天风格列表 start &ndash;&gt;-->
        <!--            &lt;!&ndash;清空所有对话&ndash;&gt;-->
        <!--            <dialogItem-->
        <!--                :info="{-->
        <!--                    title: can_delete_session ? '确认清空' : '清空所有对话',-->
        <!--                    click: this.deleteAllSession,-->
        <!--                }"-->
        <!--                v-show="can_select_style"-->
        <!--            >-->
        <!--                <img-->
        <!--                    src="@/assets/svg/trash.png"-->
        <!--                    v-show="!can_delete_session"-->
        <!--                    class="icon"-->
        <!--                    alt="DeleteAll"-->
        <!--                />-->
        <!--                <img-->
        <!--                    src="@/assets/svg/yes.svg"-->
        <!--                    v-show="can_delete_session"-->
        <!--                    class="icon"-->
        <!--                    alt="Confirm"-->
        <!--                />-->
        <!--            </dialogItem>-->
        <!--            <dialogItem-->
        <!--                :info="{-->
        <!--                    title: theme ? '切换暗色主题' : '切换亮色主题',-->
        <!--                    click: this.switchTheme,-->
        <!--                }"-->
        <!--                v-show="can_select_style"-->
        <!--            >-->
        <!--                <img src="@/assets/svg/theme.png" class="icon" alt="Theme" />-->
        <!--            </dialogItem>-->
        <!--            &lt;!&ndash; 关于我们 &ndash;&gt;-->
        <!--            <dialogItem-->
        <!--                :info="{-->
        <!--                    title: '关于我们',-->
        <!--                    click: this.showAboutPopup,-->
        <!--                    mystyle: 'marginBottom: 0px',-->
        <!--                }"-->
        <!--                v-show="can_select_style"-->
        <!--            >-->
        <!--                <img src="@/assets/svg/info.png" class="icon" alt="About" />-->
        <!--            </dialogItem>-->
        <!--可选聊天风格列表 end -->
        <!--        </div>-->
    </ul>
</template>

<script>
    import dialogItem from "@/components/sideBar/dialogItem";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "bottomBoard",
        components: { dialogItem },
        methods: {
            deleteAllSession() {
                this.$store.dispatch("moduleSideBar/deleteallsession");
            },
            showSessionStyle() {
                this.$store.commit("moduleSideBar/SHOWSESSIONSTYLE");
            },
            signOut() {
                this.$store.commit("moduleSideBar/SIGNOUT");
            },
            switchSessionStyle(info) {
                let data = info.passdata.style;
                this.$store.commit("moduleSideBar/SWITCHSESSIONSTYLE", data);
                this.$store.commit("moduleDialog/NEWCHAT", data);
            },
            showAboutPopup() {
                // 弹出 About 弹窗
                this.$store.commit("CHANG_ABOUT_POPUP", true);
                // 关闭侧边栏
                this.$store.commit("CHANG_SIDEBAR", 0);
            },
            showOptionPopup() {
                // 弹出 MORE_OPTIONS 弹窗
                this.$store.commit("CHANG_MORE_OPTIONS_POPUP", true);
                // 关闭侧边栏
                this.$store.commit("CHANG_SIDEBAR", 0);
            },
            changeRouterHome() {
                // 跳转到 home页面
                this.$store.dispatch("changerouter", "/home");
                // 关闭侧边栏
                this.$store.commit("CHANG_SIDEBAR", 0);
            },
            switchTheme() {
                this.$store.commit("SWITCHTHEME");
            },
        },
        computed: {
            ...mapGetters("moduleUserinfo", ["check_user_bind"]),
            ...mapState({
                can_delete_session: (state) =>
                    state.moduleSideBar.can_delete_session,
                can_select_style: (state) =>
                    state.moduleSideBar.can_select_style,
                can_signout: (state) => state.moduleSideBar.can_signout,
                theme: (state) => state.theme,
            }),
        },
    };
</script>

<style scoped>
    .bottom {
        width: 100%;
        padding-top: 8px;
        border-top: 1px solid #4c4d4f;
    }

    .bottom img {
        width: 24px;
        height: 24px;
    }

    .border {
        border-radius: 5px;
    }

    .icon {
        width: 24px;
        height: 24px;
    }
</style>
