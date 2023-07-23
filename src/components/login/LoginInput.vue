<template>
  <div class="box">
    <h3 class="title">{{ info.title }}</h3>
    <!--输入框-->
    <div class="input-cont">
      <input type="text" class="input" v-model="inputvalue"/>
      <button @click="pasteToken" class="paste">粘贴</button>
    </div>
    <!--控制按钮-->
    <div class="btn">
      <button @click="clearAll" class="clear">清空</button>
      <button @click="info.callback(inputvalue)" class="login">
        登录
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LoginInput",
  data() {
    return {
      inputvalue: "",
    };
  },
  props: ["info"],
  methods: {
    // 粘贴函数
    pasteToken() {
      navigator.clipboard
          .readText()
          .then((text) => {
            this.inputvalue = text;
          })
          .catch((error) => {
            this.$message({
              message: `自动粘贴失败，请您手动粘贴`,
              type: "error",
            });
          });
    },
    clearAll() {
      this.inputvalue = "";
    },
  },
  computed: {
    ...mapGetters("moduleUserinfo", ["user_wallet"]),
  },
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: block;
  text-align: left;
  margin-bottom: 10px;
}

.input-cont {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 36px;
  border-radius: 50px;
  border: 1px solid #666;
  /* background-color: lightblue; */
}

.input {
  flex: 1;
  height: 100%;
  padding-left: 18px;
  background-color: transparent;
}

.paste {
  width: 15%;
  border-left: 1px solid #666;
  background-color: #e4e4e4;
}

.btn {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 25px;
}

.btn button {
  height: 36px;
  width: 100px;
  font-size: 14px;
  border-radius: 50px;
  border: 1px solid #666;
  background-color: #e4e4e4;
}

.btn .clear {
  background-color: #eee;
}

.btn .login {
  margin-left: 10px;
  color: #fff;
  border: 1px solid transparent;
  background-color: #00bfff;
}
</style>
