<template>
  <div class="logitem" :class="is_user ? 'user' : 'robot'">
    <div class="content">
      <UserHeader :logitem="info"/>
      <vue-markdown :source="source" v-highlight class="text">
      </vue-markdown>
    </div>
  </div>
</template>

<script>
import UserHeader from "@/components/dialog/UserHeader";
import {mapState} from "vuex";
// import "highlight.js/styles/atom-one-light";
// 将 text-markdown 转 html
import VueMarkdown from "vue-markdown";

export default {
  name: "LogItem",
  props: ["info"],
  components: {UserHeader, VueMarkdown},
  data() {
    return {
      markdownText: "",
      source: this.info.content,
    };
  },
  computed: {
    ...mapState(["layoyt_mod"]),
    is_user() {
      return this.info.role === "user";
    },
  },
};
</script>

<style scoped>
.logitem {
  width: 100%;
  padding: 20px 5px;
  border-bottom: 1px solid #ccc;
}

.content {
  display: flex;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.robot {
  background-color: #f7f7f7;
}

.text {
  flex: 1;
  white-space: pre-wrap;
}

.text li{
  display: inline-block;
}


:global(pre code) {
  display: block;
  overflow-x: auto;
  padding: 1em;
}

:global(code) {
  color: #383a42;
  background: #fafafa;
}
</style>
