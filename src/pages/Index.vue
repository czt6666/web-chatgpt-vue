<template>
    <div class="gpt">
        <main>
            <sideBar />
            <section>
                <vue-scroll :ops="ops">
                    <Dialogue v-show="logs.length" />
                    <welcome v-show="!logs.length" />
                </vue-scroll>
                <Input />
            </section>
        </main>
    </div>
</template>

<script>
    import Input from "@/components/input/AskInput";
    import Dialogue from "@/components/dialog/Dialogue";
    import sideBar from "@/components/sideBar/sideBar";
    import topBar from "@/components/topBar/topBar";
    import welcome from "@/components/welcome/welcome";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "ChatGpt",
        components: { Input, Dialogue, sideBar, topBar, welcome },
        data() {
            return {
                ops: {
                    scrollPanel: {
                        scrollingX: true,
                        scrollingY: true,
                        speed: 300,
                    },
                    bar: {
                        keepShow: false,
                        background: "#c1c1c1",
                    },
                },
            };
        },
        computed: {
            ...mapState(["client_width", "client_height"]),
            ...mapGetters({
                logs: "moduleDialog/display_messages",
            }),
        },
    };
</script>

<style scoped>
    .gpt {
        overflow: hidden;
        width: 100%;
        height: 100vh;
        margin: 0;
    }

    main {
        display: flex;
        flex-direction: row;
        width: 100vw;
        height: 100vh;
    }

    section {
        overflow: hidden;
        position: relative;
        flex: 1;
        width: 0;
        height: 100vh;
        background-color: var(--light-primary-color);
    }
</style>
