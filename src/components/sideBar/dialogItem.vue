<template>
  <div class="dialog"
       :class="{ border: info.border, current: info.current }"
       @click="info.click(info)"
  >
    <!-- svg icon -->
    <slot></slot>
    <span class="title">{{ info.title }}</span>
    <slot name="end"></slot>
  </div>
</template>

<script>
export default {
  name: "dialogItem",
  props: ["info"],
};
</script>

<style scoped>
.dialog {
  overflow: hidden;
  display: flex;
  width: 100%;
  /* width: 244px; */
  height: 48px;
  border-radius: 5px;
  justify-content: start;
  align-items: center;
  padding-left: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.dialog:hover {
  background-color: #2a2b2f;
}

.border {
  border: 1px solid #4c4d4f;
}

.current {
  background-color: #313238;
}

.current:hover {
  background-color: #3a3b3f;
}

.dialog span {
  overflow: hidden;
  flex: 1;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title {
  margin-left: 8px;
}
</style>
