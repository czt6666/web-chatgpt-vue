<template>
    <div class="sidebar" :class="isClose ? 'collapse' : ''">
        <nav class="nav">
            <topBoard class="top" />
            <bottomBoard />
        </nav>
        <div class="close" @click="toggleCollapse">
            <div class="top"></div>
            <div class="btm"></div>
        </div>
    </div>
</template>

<script>
    import bottomBoard from "@/components/sideBar/bottomBoard";
    import topBoard from "@/components/sideBar/topBoard";

    export default {
        name: "sideBar",
        components: { bottomBoard, topBoard },
        data() {
            return {
                isClose: false,
            };
        },
        methods: {
            toggleCollapse() {
                this.isClose = !this.isClose;
            },
        },
    };
</script>

<style scoped>
    .sidebar {
        overflow: visible;
        position: relative;
        width: 260px;
        transition: all 0.2s ease-in-out;
    }
    .sidebar.collapse {
        width: 0px;
        padding: 0;
    }
    .close {
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 10px;
        height: 60px;
        z-index: 100;
        cursor: pointer;
    }
    .close div {
        width: 4px;
        height: 14px;
        flex-grow: 0;
        flex-basis: unset;
        background-color: var(--sidebar-close-color);
        border-radius: 4px;
        transition: transform 0.2s ease-in-out;
    }
    .close:hover div,
    .collapse .close div {
        background-color: var(--sidebar-close-active-color);
    }
    .close .top {
        transform: translateY(3px);
    }
    .close .btm {
        transform: translateY(-3px);
    }
    .close:hover .top {
        transform: translateY(3px) rotate(10deg);
    }
    .close:hover .btm {
        transform: translateY(-3px) rotate(-10deg);
    }
    .collapse .close .top {
        transform: translateY(3px) rotate(-10deg);
    }
    .collapse .close .btm {
        transform: translateY(-3px) rotate(10deg);
    }

    .nav {
        display: flex;
        width: 260px;
        height: 100vh;
        padding: 8px;
        flex-direction: column;
        /* background-color: #202123; */
        background-color: var(--dark-primary-color);
    }
    .top {
        overflow: hidden;
        flex: 1;
    }
</style>
