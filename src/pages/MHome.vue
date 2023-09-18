<template>
    <div class="box mob">
        <main>
            <MHomeTopBar />
            <section>
                <router-view></router-view>
            </section>
        </main>
    </div>
</template>

<script>
    import MHomeTopBar from "@/components/home/moble/MHomeTopBar";

    export default {
        name: "MHome",
        data() {
            return {};
        },
        components: { MHomeTopBar },
        created() {
            this.$store.dispatch("moduleUserinfo/requserallinfo");
        },
    };
</script>

<style scoped>
    main {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }
    section {
        width: 100%;
        background-color: var(--light-primary-color);
    }
</style>
