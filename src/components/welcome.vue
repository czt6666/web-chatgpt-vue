<template>
  <div class="box">
    <h1>{{ main_title }}</h1>
    <div
        class="content"
        :style="{ flexDirection: layout_mod ? 'column' : 'row' }"
    >
      <ul class="clume" v-for="(clu, index) of clume" :key="index"
          :style="{ marginLeft: layout_mod ? '0px' : '10px' }">
        <li class="inc">
          <img :src="clu.icon" class="icon"/>
<!--          <img src="../assets/svg/painting.svg" class="icon"/>-->
          <span class="title">{{ clu.title }}</span>
        </li>
        <li
            class="cont"
            v-for="(cont, idx) of clu.content"
            :key="idx"
            @click="setQuestion(cont)"
        >
          {{ cont }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "welcome",
  data() {
    return {
      main_title: "ChatGPT",
      clume: [
        {
          icon: "https://czt666.cn/gpt/img/umbrella.svg",
          title: "简单的问候",
          content: ["你好", "你是谁", "很高兴遇见你"],
        },
        {
          icon: "https://czt666.cn/gpt/img/shopping.svg",
          title: "编程实现",
          content: [
            "用js写一个轮播图",
            "用java打印helloworld",
            "用python实现梯度下降算法",
          ],
        },
        {
          icon: "https://czt666.cn/gpt/img/painting.svg",
          title: "AI创作",
          content: [
            "写一篇科幻小说",
            "用李白的风格写一首诗",
            "写一篇挑战杯开幕的新闻报道",
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["layout_mod"]),
  },
  methods: {
    setQuestion(ques) {
      this.$bus.$emit("setQuestion", ques);
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
  padding-top: 30px;
}

h1,
h2 {
  text-align: center;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 14px;
  font-weight: 400;
}

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
  margin-bottom: 20px;
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
