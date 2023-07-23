<template>
  <div>
    <h4 class="free"
        :class="{mob:layout_mod}"
        v-show="init.is_free">
      {{ init.free_title }}
      <i class="ques" @click="question">?</i>
    </h4>
    <a
        href="https://beian.miit.gov.cn/"
        class="link"
        target="blank"
        v-show="!layout_mod && !init.is_free"
    >京ICP备2022004581号-1</a
    >
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Filing",
  data() {
    return {};
  },
  computed: {
    ...mapState(["layout_mod", "init"]),
  },
  methods: {
    question() {
      window.location = this.$link.charge;
    }
  },
  mounted() {
    // setTimeout(() => {
    //     this.showfree = 0;
    // }, 5000);
  },
};
</script>

<style scoped>
.link {
  position: fixed;
  height: 20px;
  bottom: -28px;
  font-size: 12px;
  left: 50%;
  color: #c4c4c4;
  transform: translateX(-50%);
}

.free {
  position: fixed;
  height: 20px;
  width: 100%;
  bottom: -28px;
  left: 50%;
  text-align: center;
  font-size: 12px;
  font-weight: 200;
  transform: translateX(-50%);
}
.mob{
  bottom: -20px;
}
.ques {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 12px;
  color: #00abe4;
  margin-left: 1px;
  border: 1px solid #00abe4;
  border-radius: 100px;
  transform: scale(0.8);
  cursor: pointer;
}
</style>
