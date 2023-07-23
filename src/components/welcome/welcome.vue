<template>
  <div class="box">
    <Model/>
    <!-- 自动提问 -->
    <Tips v-show="!show_conf"/>
    <!-- 聊天配置 -->
    <ClumeConf v-show="show_conf"/>
    <!-- 切换按钮-->
    <div
        @click="changeConf"
        class="config-box"
        :style="{ marginLeft: layout_mod ? '0px' : '10px' }"
    >
      <i
          class="config_icon"
          v-show="!show_conf"
      ></i>
      <i
          class="chat_icon"
          v-show="show_conf"
      ></i>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ClumeConf from "@/components/welcome/Config";
import Tips from "@/components/welcome/Tips";
import Model from "@/components/welcome/Model";

export default {
  name: "welcome",
  components: {ClumeConf, Tips, Model},
  data() {
    return {
      show_conf: 0,
      main_title: "ChatGPT",
    };
  },
  computed: {
    ...mapState(["layout_mod"]),
  },
  methods: {
    changeConf() {
      this.show_conf = !this.show_conf;
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 0 50px;
}

.config-box {
  display: flex;
  width: 48px;
  height: 48px;
  margin-left: 10px;
  color: #555;
  background-color: #f3f3f3;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}

.config-box i {
  display: flex;
  justify-content: center;
  align-items: center;
}

.config-box i:after {
  display: inline-block;
  font: normal normal normal 14px/1 "icomoon";
  font-family: "icomoon";
  font-size: 22px;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.config_icon:after {
  content: "\e929";
}

.chat_icon:after {
  content: "\e90a";
}
</style>
