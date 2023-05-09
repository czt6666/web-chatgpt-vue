<template>
  <div
      class="box"
      :style="{
            bottom: layout_mod ? '10px' : '30px',
            position: layout_mod ? 'fixed' : 'absolute',
        }"
  >
    <div class="bottom">
      <!-- 这个 textarea 无法在输入多行的情况下上下滚动 -->
      <div class="input-box">
                <textarea
                    class="input"
                    v-model="ask"
                    ref="textarea"
                    id="textarea"
                    autofocus
                    @keyup.enter="askchatgpt()"
                    @input="textareaHeight"
                    rows="1"
                    maxlength="500"
                ></textarea>
      </div>
      <span class="submit" @click="askchatgpt()">
                <span class="send" v-show="!is_ansing"></span>
                <img
                    class="loading"
                    src="@/assets/img/loading.webp"
                    v-show="is_ansing"
                />
            </span>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Input",
  data() {
    return {
      ask: ``,
      scrollHeight: "40",
      textarea_height: "",
    };
  },
  methods: {
    askchatgpt() {
      // 正在回答 不可提问
      if (this.is_ansing) {
        this.$message({
          message: "正在努力解决您的问题，暂时不可提问",
          type: "warning",
        });
        // 删除回车符
        const lastChar = this.ask.slice(-1);
        if (lastChar === '\n') {
          this.ask = this.ask.substring(0, this.ask.length - 1);
          this.$refs.textarea.style.height = "auto";
        }
        return;
      }
      const ask = this.ask.trim();
      this.$store.dispatch("moduleDialog/streamaskchatgpt", ask);
      this.ask = "";
      this.$refs.textarea.style.height = "auto";
    },
    textareaHeight(e) {
      const textarea = e.target;
      textarea.style.height = "auto";
      const height =
          textarea.scrollHeight > 135 ? 135 : textarea.scrollHeight;
      textarea.style.height = height + "px";
    },
  },
  computed: {
    ...mapState({
      is_ansing: (state) => state.moduleDialog.is_ansing,
      layout_mod: (state) => state.layout_mod,
    }),
  },
  mounted() {
    this.$bus.$on("setQuestion", (val) => {
      this.ask = val;
      this.askchatgpt();
    });
  },
  beforeDestroy() {
    this.$bus.$off("setQuestion");
  },
};
</script>

<style scoped>
.box {
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 100%;
  height: 40px;
  transform: translateX(-50%);
}

.bottom {
  display: flex;
  height: 40px;
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
}

textarea {
  border: 1px solid #ccc;
  outline: none;
}

.input-box {
  position: relative;
  top: 0;
  left: 0;
  flex: 1;
  height: 40px;
  min-height: 40px;
}

.input {
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 40px;
  max-height: 135px;
  padding: 9px 12px;
  border-radius: 5px;
  line-height: 1.73em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.submit {
  position: relative;
  overflow: hidden;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.send:after {
  content: "\e90d";
  display: inline-block;
  font: normal normal normal 14px/1 "icomoon";
  font-family: "icomoon";
  font-size: 22px;
  line-height: 40px;
  color: #069bff;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -50%);
  width: 260%;
  height: 220%;
}
</style>
