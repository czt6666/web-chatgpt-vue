<template>
  <div>
    <!--动画-->
    <transition
        name="animate__animated animate__bounce"
        enter-active-class=""
        leave-active-class="animate__fadeOut"
    >
      <div class="tran" v-show="1"/>
    </transition>
    <!--    动态绑定 class style-->
    <div class="abc" :class="choose_open ? 'a' : 'b'" :style="{
                transform: choose_open ? 'rotate(180deg)' : 'rotate(0deg)',
            }">
    </div>
    <div class="icon"></div>

  </div>
</template>

<script>
import "animate.css";
import {mapState, mapGetters} from "vuex";

export default {
  name: 'Base',
  data() {
    return {
      choose_open: 0,
    };
  },
  computed: {
    // mapState
    ...mapState({
      // allPosts: (state) => state.moduleA.allPosts,
    }),
    // mapGetters
    ...mapGetters({
      // allPostsNew: "allPostsNew",
    }),
  },
  methods: {
    // vuex
    givelike(post_id) {
      const data = {post_id};
      this.$store.dispatch("givelike", data);
    },
    // 事件总线
    DragOpen() {
      this.$bus.$emit("DragOpen", 1)
    }
  },
  mounted() {
    this.$bus.$on("DragOpen", (val) => {
      this.choose_open = val;
    });
  },
  beforeDestroy() {
    this.$bus.$off("DragOpen");
  },

}
</script>

<style scoped>
.icon:before{
  content: "\e98c";
  display: inline-block;
  font: normal normal normal 14px/1 'icomoon';
  font-family: 'icomoon';
  font-size: inherit;
  /* color: #10aeec; */
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>