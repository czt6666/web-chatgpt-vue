<template>
  <div class="gpt">
    <main>
      <topBar/>
      <!--  :style="{height: sectionheight + 'px'}"   -->
      <section>
        <vue-scroll>
          <Dialogue v-show="logs.length"/>
          <welcome v-show="!logs.length"/>
        </vue-scroll>
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
  name: "MChatGpt",
  components: {Input, Dialogue, Introduce, sideBar, topBar, welcome},
  data() {
    return {
      ops: {
        scrollPanel: {
          scrollingX: true,
          scrollingY: false,
          speed: 300,
        },
        rail:{
          size:'3px'
        },
        bar: {
          size:'3px',
          background: "#c1c1c1",
        },
      },
    };
  },
  computed: {
    ...mapState(["layout_mod", "client_width", "client_height"]),
    ...mapState({
      logs: (state) => state.moduleDialog.messages,
    }),
    // sectionheight() {
    //   let clientheight = document.body.clientHeight;
    //   console.log(clientheight - 48);
    //   return clientheight - 48;
    // },
  },
  created() {
  },
};
</script>

<style scoped>
.gpt {
  width: 100%;
  height: 100vh;
}

main {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

nav {
  height: 48px;
}

section {
  width: 100%;
  padding: 48px 0;
}
</style>
