<template>
    <div>
        <!--顶部导航栏-->
        <div class="topbar">
            <img
                src="@/assets/svg/menu.svg"
                class="icon"
                alt="menu"
                @click="showDragBar()"
            />
            <span>{{ curr_session_title }}</span>
            <img
                src="@/assets/svg/add.svg"
                class="icon-larger"
                alt="addChat"
                @click="newChat()"
            />
        </div>
        <!--侧边拉出栏-->
        <div>
            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeIn enter-active"
                leave-active-class="animate__fadeOut leave-active"
            >
                <background v-show="show_sidebar" />
            </transition>
            <transition
                name="animate__animated animate__bounce"
                enter-active-class="animate__slideInLeft enter-active"
                leave-active-class="animate__slideOutLeft leave-active"
            >
                <dragBoard v-show="show_sidebar" />
            </transition>
        </div>
    </div>
</template>

<script>
    import "animate.css";
    import background from "@/components/topBar/background";
    import dragBoard from "@/components/topBar/dragBoard";
    import { mapState, mapGetters } from "vuex";

    export default {
        name: "topBar",
        components: { background, dragBoard },
        data() {
            return {};
        },
        methods: {
            showDragBar() {
                this.$store.commit("CHANG_SIDEBAR", 1);
            },
            newChat() {
                // 新建一个session
                this.$store.commit("moduleDialog/NEWCHAT");
                // 总线 让输入框focus
                this.$bus.$emit("newChat");
            },
        },
        computed: {
            ...mapState(["show_sidebar"]),
            ...mapGetters("moduleDialog", ["curr_session_title"]),
        },
    };
</script>

<style scoped>
    .topbar {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 48px;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        color: var(--sidebar-text-color);
        z-index: 100;
        background-color: var(--dark-primary-color);
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    .icon-larger {
        width: 32px;
        height: 32px;
    }

    /* 侧边栏动画时间 */
    .enter-active,
    .leave-active {
        animation-duration: 0.3s;
    }
</style>
