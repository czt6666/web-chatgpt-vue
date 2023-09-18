<template>
  <div id="app" :class="themeColor">
    <router-view></router-view>
    <popupIndex/>
  </div>
</template>

<script>
import popupIndex from "@/components/popup/PopupIndex";
import {mapState} from "vuex";

export default {
  name: "App",
  components: {popupIndex},
  computed: {
    themeColor() {
      if (this.theme) return "light-theme";
      return "dark-theme";
    },
    ...mapState(["theme"])
  },
  mounted() {
  },
  created() {
    this.$store.dispatch("moduleDialog/reqallsession");
    this.$store.dispatch("reqinitconfig");
    this.$store.dispatch("moduleUserinfo/requserallinfo");
    this.$store.dispatch("hitsindex");
    // 改变屏幕适配 和 html_font_size
    const width = document.body.clientWidth;
    this.$store.dispatch("adapt", width);
    window.addEventListener("resize", () => {
      const width = document.body.clientWidth;
      this.$store.dispatch("adapt", width);
    });
  },
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Microsoft YaHei",
  sans-serif;
  font-size: 16px;
  color: var(--text-color);
  line-height: 1.75;
  background-color: var(--light-primary-color);
}

@font-face {
  font-family: "icomoon";
  src: url("./components/fonts/icomoon.eot?kikvbn");
  src: url("./components/fonts/icomoon.eot?kikvbn#iefix") format("embedded-opentype"),
  url("./components/fonts/icomoon.ttf?kikvbn") format("truetype"),
  url("./components/fonts/icomoon.woff?kikvbn") format("woff"),
  url("./components/fonts/icomoon.svg?kikvbn#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
</style>
