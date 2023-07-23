<template>
  <div>
    <div
        class="content"
        :style="{ flexDirection: layout_mod ? 'column' : 'row' }"
    >
      <ul
          class="clume"
          v-for="(tip, index) of welcome_tips"
          :key="index"
          :style="{ marginLeft: layout_mod ? '0px' : '10px' }"
      >
        <!--icon 小li-->
        <li class="inc">
          <img :src="tip.icon" class="icon"/>
          <span class="title">{{ tip.title }}</span>
        </li>
        <!--tip 小li-->
        <li
            class="cont"
            v-for="(text, idx) of tip.content"
            :key="idx"
            @click="setQuestion(text)"
        >
          {{ text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Tips",
  computed: {
    ...mapState(["layout_mod"]),
    ...mapState({
      welcome_tips: state => state.init.welcome_tips
    })
  },
  methods: {
    setQuestion(ques) {
      this.$bus.$emit("setQuestion", ques);
    },
  },

};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: #555;
  /* background-color: pink; */
}

.clume {
  flex: 1;
  margin-left: 10px;
  /* margin-bottom: 20px; */
  /* background-color: lightblue; */
}

.clume:nth-child(1) {
  margin-left: 0;
}

.clume li {
  margin-bottom: 10px;
}

.inc .icon {
  display: block;
  height: 48px;
  margin: 0 auto;
}

.cont {
  padding: 10px;
  border-radius: 5px;
  background-color: #f3f3f3;
  cursor: pointer;
}

.cont:after {
  content: "\f178";
  display: inline-block;
  font: normal normal normal 14px/1 "icomoon";
  font-family: "icomoon";
  font-size: inherit;
  /* color: #10aeec; */
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.cont:hover {
  background-color: #e7e7e7;
}
</style>