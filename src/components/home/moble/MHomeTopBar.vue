<template>
  <div>
    <!--顶部导航栏-->
    <div class="topbar">
      <img
          src="@/assets/svg/menu.svg"
          class="icon"
          @click="showDragBar()"
      />
      <span class="main-title">{{ home_title }}</span>
      <img
          src="@/assets/svg/back2.png"
          class="icon-larger"
          @click="backIndex"
      />
    </div>
    <!--侧边拉出栏-->
    <div>
      <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeIn enter-active"
          leave-active-class="animate__fadeOut leave-active"
      >
        <background v-show="show_sidebar"/>
      </transition>
      <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__slideInLeft enter-active"
          leave-active-class="animate__slideOutLeft leave-active"
      >
        <MHomeDragBoard v-show="show_sidebar"/>
      </transition>
    </div>
  </div>
</template>

<script>
import "animate.css";
import background from "@/components/topBar/background";
import MHomeDragBoard from "@/components/home/moble/MHomeDragBoard";
import {mapState, mapGetters} from "vuex";

export default {
  name: "topBar",
  components: {background, MHomeDragBoard},
  data() {
    return {};
  },
  methods: {
    showDragBar() {
      this.$store.commit("CHANG_SIDEBAR", 1);
    },
    backIndex() {
      this.$store.dispatch("changerouter", "/");
      // 关闭侧边栏
      this.$store.commit("CHANG_SIDEBAR", 0);
    },
  },
  computed: {
    ...mapState(["show_sidebar"]),
    home_title() {
      return this.$route.meta.title;
    }
  },
};
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  color: #fff;
  z-index: 100;
  background-color: #202123;
}

.icon {
  display: block;
  width: 24px;
  height: 24px;
}

.icon-larger {
  width: 32px;
  height: 32px;
}

/* 侧边栏动画时间 */
.enter-active,
.leave-active {
  animation-duration: 0.3s;
}
</style>
