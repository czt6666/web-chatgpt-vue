<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="markdown-body" v-html="">-->
<!--      <vue-markdown :source="content" v-highlight class="text"  ref="contentRef">-->
<!--      </vue-markdown>-->
<!--    </div>-->
<!--    <div v-show="showCursor" class="cursor" :style="{left: pos.x,right:pos.y}"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import "highlight.js/styles/atom-one-light.css";-->
<!--// 将 text-markdown 转 html-->
<!--import VueMarkdown from "vue-markdown";-->

<!--export default {-->
<!--  name: "aa",-->
<!--  components: {VueMarkdown},-->
<!--  data() {-->
<!--    return {-->
<!--      showCursor: true,-->
<!--      content: "",-->
<!--      pos: {-->
<!--        x: 0,-->
<!--        y: 0,-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    updataCursor() {-->
<!--      const contentDom = this.$refs.contentRef.value;-->
<!--      console.log(contentDom);-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.updataCursor();-->
<!--    const text = "\"使用`querystring`模块将数据转换为`x-www-form-urlencoded`格式的字符串，然后在Fetch API发送请求时将字符串作为请求体即可。具体示例如下：\\n\\n```javascript\\nconst querystring = require('querystring');\\n\\nconst formData = {\\n  param1: 'value1',\\n  param2: 'value2'\\n};\\n\\nconst requestBody = querystring.stringify(formData); // 将FormData转换为x-www-form-urlencoded格式的字符串\\n\\nfetch(url, {\\n  method: 'POST',\\n  headers: {\\n    'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头\\n  },\\n  body: requestBody // 将字符串作为请求体\\n})\\n.then(response => {\\n  // 处理响应\\n})\\n.catch(error => {\\n  console.error(error);\\n});\\n```\\n\\n其中，`querystring.stringify()`方法将一个对象转换为`x-www-form-urlencoded`格式的字符串。\"\n";-->
<!--    let index = 0;-->
<!--    let timer = setInterval(() => {-->
<!--      if (index >= text.length) {-->
<!--        clearInterval(timer);-->
<!--        this.showCursor = false;-->
<!--        return;-->
<!--      }-->
<!--      this.content += text[index++];-->
<!--    }, 100);-->
<!--  },-->
<!--  updated() {-->
<!--    this.updataCursor();-->
<!--  }-->
<!--};-->

<!--</script>-->

<!--<style scoped>-->
<!--.markdown-body {-->
<!--  background: inherit;-->
<!--}-->

<!--.container {-->
<!--  position: relative;-->
<!--}-->

<!--.cursor {-->
<!--  content: '';-->
<!--  position: absolute;-->
<!--  width: 10px;-->
<!--  height: 1em;-->
<!--  background: #d5d9da;-->
<!--  animation: toggle 0.6s infinite;-->
<!--  opacity: 0;-->
<!--  transform: translateY(3px);-->

<!--}-->

<!--@keyframes toggle {-->
<!--  30% {-->
<!--    opacity: 1;-->
<!--  }-->
<!--}-->
<!--</style>-->