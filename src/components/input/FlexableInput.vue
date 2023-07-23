<template>
  <div class="box">
    <div class="content" :class="{ focus: is_focus }">
            <textarea
                class="input"
                @blur="onBlur"
                @keydown.enter="onBlur"
                v-on:focus="onFocus"
                :style="{ height: 12 + 20 * info.height + 'px' }"
                :placeholder="types[info.type].plac"
                :maxlength="types[info.type].maxlength"
                v-model="info.content"
            ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexableInput",
  props: ["info"],
  data() {
    return {
      is_focus: 0,
      types: {
        nick: {
          plac: "修改昵称",
          maxlength: "15",
        },
        phone: {
          plac: "修改手机号",
          maxlength: "11",
        },
        email: {
          plac: "修改邮箱",
          maxlength: "30",
        },
      },
    };
  },
  methods: {
    onFocus() {
      this.is_focus = 1;
    },
    onBlur() {
      this.is_focus = 0;
      this.info.onsubmit(this.info.content);
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  /* min-height: 30px; */
  /* padding: 0px 10px; */
  border-radius: 5px;
  outline: 1px solid #ccc;
  animation: all 0.3s ease-in-out;
  cursor: pointer;
}

.content:hover,
.focus {
  outline: 1px solid #4eee94;
}

.input {
  overflow: hidden;
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 10px;
  border: none;
  resize: none;
  background-color: transparent;
}

.input:focus {
  border: none;
  outline: none;
}
</style>
