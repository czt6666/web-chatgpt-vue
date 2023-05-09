<template>
  <div class="dialog">
    <!--<LogItem v-for="(item, index) of logs" :key="generateRandomKey()" :info="item"/>-->
    <logItemPro v-for="(item, index) of logs" :key="generateRandomKey()" :info="item"/>
    <div class="block"></div>
  </div>
</template>

<script>
import LogItem from "./LogItem.vue";
import logItemPro from "@/components/dialog/LogItemPro";
import {mapState} from "vuex";

export default {
  name: "Dialogue",
  components: {LogItem, logItemPro},
  data() {
    return {};
  },
  methods: {
    generateRandomKey() {
      return Math.random();
    },
  },
  computed: {
    ...mapState({
      messages: state => state.moduleDialog.messages
    }),
    logs() {
      if (this.messages.length !== 0 && this.messages[0].role === "system") {
        return this.messages.slice(1);
      } else {
        return this.messages;
      }
    }
  },
};
</script>

<style scoped>
.dialog {
  /* display: flex; */
  /* flex-direction: column; */
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  background-color: #fff;
}

.block {
  float: left;
  width: 100%;
  height: 100px;
//background-color: pink;
}
</style>
