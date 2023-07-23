<template>
  <div id="app">
    <router-view></router-view>
    <popupIndex/>
  </div>
</template>

<script>
import popupIndex from "@/components/popup/PopupIndex";

export default {
  name: "App",
  computed: {},
  components: {popupIndex},
  mounted() {
  },
  created() {
    // this.$store.dispatch("requserheader");
    this.$store.dispatch("reqinitconfig");
    this.$store.dispatch("moduleDialog/reqallsession");
    this.$store.dispatch("moduleUserinfo/requserallinfo")
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
  color: #333;
  line-height: 1.75;
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
