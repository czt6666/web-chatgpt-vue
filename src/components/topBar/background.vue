<template>
  <div class="back" @click.self="hiddenDragBar()"></div>
</template>

<script>
export default {
  name: "background",
  methods: {
    hiddenDragBar() {
      this.$store.commit("CHANG_SIDEBAR", 0);
    },
  },
};
</script>

<style scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  background-color: #575a5fa7;
}
</style>
