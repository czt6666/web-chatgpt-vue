<template>
  <div class="logitem" :class="is_user ? 'user' : 'robot'" >
    <div class="content">
      <UserHeader :logitem="info"/>
      <div class="text" :style="{color: is_error ? '#FF4040' : ''}">
        <div class="markdown-body" v-html="markdownContent" ref="contentRef">
        </div>
        <div v-show="showCursor" class="cursor"></div>
<!--<div class="hljs"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "@/components/dialog/UserHeader";
import {marked} from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import {mapState} from "vuex";
// atom-one-light tomorrow-night-blue

export default {
  name: "LogItemPro",
  props: ["info"],
  components: {UserHeader},
  data() {
    return {
      showCursor: this.info.showCursor,
      content: "",
      pos: {
        x: 0,
        y: 0,
      },
      source: this.info.content,
      is_error: this.info.is_error,
    };
  },
  methods: {
    updataCursor() {
      const contentDom = this.$refs.contentRef.valueOf();
      const lastText = getLastTextNode(contentDom);
      const textNode = document.createTextNode("\u200b");
      if (lastText) {
        lastText.parentElement.appendChild(textNode);
      } else {
        contentDom.appendChild(textNode);
      }
      const domRect = contentDom.getBoundingClientRect();
      const range = document.createRange();
      range.setStart(textNode, 0);
      range.setEnd(textNode, 0);
      const rect = range.getBoundingClientRect();
      this.pos.x = rect.left - domRect.left;
      this.pos.y = rect.top - domRect.top;
      textNode.remove();
    },
  },
  computed: {
    ...mapState(["layout_mod"]),
    is_user() {
      return this.info.role === "user";
    },
    markdownContent() {
      return marked.parse(this.source);
    },
  },
  mounted() {
    this.updataCursor();
  },
  updated() {
    this.updataCursor();
  }
};
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, {language: lang}).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

function getLastTextNode(dom) {
  const children = dom.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const node = children[i];
    if (node.nodeType === Node.TEXT_NODE && /\S/.test(node.nodeValue)) {
      node.nodeValue = node.nodeValue.replace(/\s+$/, "");
      return node;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const last = getLastTextNode(node);
      if (last) {
        return last;
      }
    }
  }
}
</script>

<!--```-->
<!--# 运行梯度下降算法-->
<!--guesses = gradient_descent(derivative=derivative, initial_guess=3, learning_rate=0.1, num_iterations=10, derivative=derivative, initial_guess=3, learning_rate=0.1, num_iterations=10)-->
<!--```-->


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
  position: relative;
  flex: 1;
  white-space: pre-wrap;
}

.text li {
  display: inline-block;
}

.cursor {
  content: '';
  position: absolute;
  width: 8px;
  height: 1em;
  background: #666;
  animation: toggle 0.6s infinite;
  opacity: 0;
  transform: translateY(3px);
  left: calc(v-bind('pos.x') * 1px);
  top: calc(v-bind('pos.y') * 1px);
}

@keyframes toggle {
  30% {
    opacity: 1;
  }
}
</style>
