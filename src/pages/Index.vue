<template>
  <div class="gpt">
    <main>
      <sideBar/>
      <section>
        <vue-scroll :ops="ops">
          <Dialogue v-show="logs.length"/>
          <welcome v-show="!logs.length"/>
        </vue-scroll>
        <!--        <vue-scroll :ops="ops_shu">-->
        <!--          <vue-scroll :ops="ops_heng">-->
        <!--            <Dialogue v-show="logs.length"/>-->
        <!--            <welcome v-show="!logs.length"/>-->
        <!--          </vue-scroll>-->
        <!--        </vue-scroll>-->
        <Input/>
      </section>
    </main>
  </div>
</template>

<script>
import Input from "@/components/Input";
import Dialogue from "@/components/dialog/Dialogue";
import Introduce from "@/components/Introduce";
import sideBar from "@/components/sideBar/sideBar";
import topBar from "@/components/topBar/topBar";
import welcome from "@/components/welcome";
import {mapState} from "vuex";

export default {
  name: "ChatGpt",
  components: {Input, Dialogue, Introduce, sideBar, topBar, welcome},
  computed: {
    ...mapState(["layout_mod", "client_width", "client_height"]),
    ...mapState({
      logs: state => state.moduleDialog.messages,
    })

  },
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
      ops_shu: {
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
      ops_heng: {
        scrollPanel: {
          scrollingX: true,
          scrollingY: true,
          speed: 300,
        },
        bar: {
          keepShow: true,
          background: "#c1c1c1",
        },
      },
    };
  },
  methods: {},
  created() {
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
  width: 100%;
  height: 100vh;
  /* background-color: lightblue; */
}
</style>
