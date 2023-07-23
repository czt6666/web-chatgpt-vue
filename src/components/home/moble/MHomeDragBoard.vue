<template>
  <div class="dragboard">
    <nav class="drag">
      <SideList/>
    </nav>
    <!--关闭按钮-->
    <div class="close" @click="hiddenDragBar()">
      <div class="border">
        <img
            src="@/assets/svg/close-48.svg"
            alt=""
            class="close-icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import topBoard from "@/components/sideBar/topBoard";
import bottomBoard from "@/components/sideBar/bottomBoard";
import SideList from "@/components/home/pc/SideList";

export default {
  name: "dragBoard",
  components: {topBoard, bottomBoard, SideList},
  methods: {
    hiddenDragBar() {
      this.$store.commit("CHANG_SIDEBAR", 0);
    },
  },
};
</script>

<style scoped>
.dragboard {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.drag {
  float: left;
  display: flex;
  width: 80vw;
  height: 100vh;
  padding: 8px;
  flex-direction: column;
  background-color: #202123;
}

.top {
  overflow: hidden;
  flex: 1;
}

.close {
  float: left;
  width: 48px;
  height: 48px;
  padding: 8px;
}

.border {
  width: 40px;
  height: 40px;
  border: 2px solid #fff;
}

.close-icon {
  display: block;
  width: 37px;
  height: 37px;
}
</style>
