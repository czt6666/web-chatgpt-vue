<!--<template>-->
<!--  <div class="container">-->
<!--    <div class="markdown-body" v-html="markdownContent" ref="contentRef">-->
<!--    </div>-->
<!--    <div v-show="showCursor" class="cursor"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import "highlight.js/styles/atom-one-light.css";-->
<!--// import "github-markdown-css/github-markdown-light.css";-->
<!--import {marked} from "marked";-->
<!--import hljs from "highlight.js";-->
<!--// import "highlight.js/styles/lightfair.css";-->
<!--// import "highlight.js/styles/kimbie-light.css";-->

<!--export default {-->
<!--  name: "aa",-->
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
<!--      const contentDom = this.$refs.contentRef.valueOf();-->
<!--      const lastText = getLastTextNode(contentDom);-->
<!--      const textNode = document.createTextNode("\u200b");-->
<!--      if (lastText) {-->
<!--        lastText.parentElement.appendChild(textNode);-->
<!--      } else {-->
<!--        contentDom.appendChild(textNode);-->
<!--      }-->
<!--      const domRect = contentDom.getBoundingClientRect();-->
<!--      const range = document.createRange();-->
<!--      range.setStart(textNode, 0);-->
<!--      range.setEnd(textNode, 0);-->
<!--      const rect = range.getBoundingClientRect();-->
<!--      this.pos.x = rect.left - domRect.left;-->
<!--      this.pos.y = rect.top - domRect.top;-->
<!--      textNode.remove();-->
<!--    },-->
<!--  },-->
<!--  computed: {-->
<!--    markdownContent() {-->
<!--      return marked.parse(this.content);-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.updataCursor();-->
<!--    const text = "使用JavaScript打印Hello World可以使用 `console.log()` 方法。这个方法可以将指定的数据打印到开发者控制台上。\n" +-->
<!--        "\n" +-->
<!--        "示例代码：\n" +-->
<!--        "\n" +-->
<!--        "```\n" +-->
<!--        "console.log(\"Hello World\");\n" +-->
<!--        "```\n" +-->
<!--        "\n" +-->
<!--        "将以上代码放入到一个HTML页面的\n" +-->
<!--        "```\n" +-->
<!--        "<div id=\"parent\">\n" +-->
<!--        "  <p>第一段</p>\n" +-->
<!--        "  <span>第二段</span>\n" +-->
<!--        "  <p>第三段</p>\n" +-->
<!--        "</div>\n" +-->
<!--        "```\n" +-->
<!--        "\n" +-->
<!--        "```\n" +-->
<!--        "   npm install github-markdown-css &#45;&#45;save\n" +-->
<!--        "   ```\n" +-->
<!--        "```\n" +-->
<!--        "/* 定义一个 ID #title，将其样式设置为一个加粗，24px 的蓝色字体 */\n" +-->
<!--        "#title {\n" +-->
<!--        "  font-weight: bold;\n" +-->
<!--        "  font-size: 24px;\n" +-->
<!--        "  color: blue;\n" +-->
<!--        "}\n" +-->
<!--        "```\n" +-->
<!--        "- `body`：将整个文档中的文本颜色设置为红色。\n" +-->
<!--        "- `.box`：定义一个类，使用 `background-color` 属性将其背景色设置为红色，`border` 属性为该元素添加一个白色边框，`text-align` 属性将内容居中。\n" +-->
<!--        "- `#title`：定义一个 ID，将页面中 ID 为 `title` 的元素的样式设置为加粗的、24px 的蓝色字体。\n" +-->
<!--        "```\n" +-->
<!--        "\n" +-->
<!--        "print(\"hello\")\n" +-->
<!--        "```";-->


<!--    // this.content = text-->
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
<!--marked.setOptions({-->
<!--  highlight: function (code, lang) {-->
<!--    if (lang && hljs.getLanguage(lang)) {-->
<!--      return hljs.highlight(code, {language: lang}).value;-->
<!--    }-->
<!--    return hljs.highlightAuto(code).value;-->
<!--  }-->
<!--});-->

<!--function getLastTextNode(dom) {-->
<!--  const children = dom.childNodes;-->
<!--  for (let i = children.length - 1; i >= 0; i&#45;&#45;) {-->
<!--    const node = children[i];-->
<!--    if (node.nodeType === Node.TEXT_NODE && /\S/.test(node.nodeValue)) {-->
<!--      node.nodeValue = node.nodeValue.replace(/\s+$/, "");-->
<!--      return node;-->
<!--    } else if (node.nodeType === Node.ELEMENT_NODE) {-->
<!--      const last = getLastTextNode(node);-->
<!--      if (last) {-->
<!--        return last;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
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
<!--  width: 8px;-->
<!--  height: 1em;-->
<!--  background: #333;-->
<!--  animation: toggle 0.6s infinite;-->
<!--  opacity: 0;-->
<!--  transform: translateY(3px);-->
<!--  left: calc(v-bind('pos.x') * 1px);-->
<!--  top: calc(v-bind('pos.y') * 1px);-->
<!--}-->

<!--@keyframes toggle {-->
<!--  30% {-->
<!--    opacity: 1;-->
<!--  }-->
<!--}-->
<!--</style>-->