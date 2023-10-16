<template>
  <div class="dialog">
    <TopModleInfo/>
    <logItemPro
        v-for="item of logs_display"
        :key="generateRandomKey()"
        :info="item"
    />
    <div class="block"></div>
  </div>
</template>

<script>
import logItemPro from "@/components/dialog/LogItemPro";
import TopModleInfo from "@/components/dialog/TopModleInfo";
import {mapGetters} from "vuex";

export default {
  name: "Dialogue",
  components: {logItemPro,TopModleInfo},
  methods: {
    generateRandomKey() {
      return `${parseInt(Math.random() * 1000000)}`;
    },
  },
  computed: {
    ...mapGetters({
      logs: "moduleDialog/display_messages",
    }),
    logs_display() {
      if (this.logs.length !== 0 && this.logs[0].role === "system") {
        // 去除system描述
        return this.logs.slice(1);
      } else {
        return this.logs;
      }
    },
  },
};
</script>

<style scoped>
.dialog {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  background-color: var(--light-primary-color);
}

.block {
  float: left;
  width: 100%;
  height: 100px;
}
</style>
