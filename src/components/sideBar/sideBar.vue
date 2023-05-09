<template>
    <nav class="nav">
        <topBoard class="top" />
        <bottomBoard />
    </nav>
</template>

<script>
    import bottomBoard from "@/components/sideBar/bottomBoard";
    import topBoard from "@/components/sideBar/topBoard";

    export default {
        name: "sideBar",
        components: { bottomBoard, topBoard },
    };
</script>

<style scoped>
    .nav {
        display: flex;
        width: 260px;
        height: 100vh;
        padding: 8px;
        flex-direction: column;
        background-color: #202123;
        /* background-color: #c5e3f6; */
    }
    .top {
        overflow: hidden;
        flex: 1;
    }
</style>
