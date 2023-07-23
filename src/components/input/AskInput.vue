<template>
  <div
      class="box"
      :style="{
            bottom: layout_mod ? '20px' : '30px',
            position: layout_mod ? 'fixed' : 'absolute',
        }"
  >
    <div class="bottom">
      <div class="btm-cont" ref="btm_content">
        <div class="input-box">
                    <textarea
                        class="input"
                        v-model="ask"
                        ref="textarea"
                        id="textarea"
                        autofocus
                        @keydown.alt.enter="addNewLine"
                        @keydown.enter="askchatgpt"
                        @input="textareaHeight"
                        rows="1"
                        maxlength="1000"
                    ></textarea>
        </div>
        <div class="send-box">
                    <span class="submit" @click="askchatgpt">
                        <span
                            class="send"
                            :class="is_free ? 'free' : ''"
                            v-show="!is_ansing"
                        ></span>
                        <img
                            class="loading"
                            src="@/assets/img/loading.webp"
                            v-show="is_ansing"
                        />
                    </span>
        </div>
      </div>
    </div>
    <Filing/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Filing from "@/components/input/Filing";

export default {
  name: "Input",
  components: {Filing},
  data() {
    return {
      ask: ``,
      scrollHeight: "50",
      textarea_height: "",
    };
  },
  methods: {
    askchatgpt(event) {
      // 正在回答 不可提问
      if (this.is_ansing) {
        this.$message({
          message: "正在努力解决您的问题，暂时不可提问",
          type: "warning",
        });
        // 删除回车符
        const lastChar = this.ask.slice(-1);
        if (lastChar === "\n") {
          this.ask = this.ask.substring(0, this.ask.length - 1);
          this.$refs.textarea.style.height = "auto";
          this.$refs.btm_content.style.height = "auto";
        }
        return;
      }
      // 光标在中间 按enter键
      if (
          event &&
          event.target.selectionStart !== null &&
          event.target.selectionEnd !== null &&
          event.target.selectionStart === event.target.selectionEnd
      ) {
        event.preventDefault();
      }

      const ask = this.ask.trim();
      // 提问内容为空
      if (!ask || ask === ""){
        this.ask = "" // 若只有回车，则删除回车
        return
      }

      this.$store.dispatch("moduleDialog/streamaskchatgpt", ask);
      this.ask = "";
      this.$refs.textarea.style.height = "auto";
      this.$refs.btm_content.style.height = "auto";
    },
    addNewLine(){
      this.ask += '\n';
    },
    textareaHeight(e) {
      const textarea = this.$refs.textarea;
      const btm_content = this.$refs.btm_content;
      textarea.style.height = "auto";
      const height =
          textarea.scrollHeight > 140 ? 140 : textarea.scrollHeight;
      textarea.style.height = height + "px";
      btm_content.style.height = height + "px";
    },
  },
  computed: {
    ...mapState({
      is_ansing: (state) => state.moduleDialog.is_ansing,
      layout_mod: (state) => state.layout_mod,
      is_free: (state) => state.init.is_free,
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
  height: 50px;
  transform: translateX(-50%);
  z-index: 50;
}

.bottom {
  position: relative;
  height: 50px;
  min-height: 50px;
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
}

.btm-cont {
  overflow: hidden;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  border: 1px solid #ccc;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: #ffffff;
}

textarea {
  border: none;
  outline: none;
}

.input-box {
  float: left;
  position: relative;
  top: 0;
  width: calc(100% - 50px);
  height: 50px;
  min-height: 50px;
}

.input {
  overflow-y: auto;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  max-height: 140px;
  padding: 13px 12px 14px;
  line-height: 1.73em;
  resize: none;
  border-right: 1px dashed #e4e4e4;
  /* background-color: lightgoldenrodyellow; */
}

.send-box {
  position: absolute;
  right: 0;
  float: left;
  width: 50px;
  height: 100%;
  /* background-color: lightgreen; */
}

.submit {
  position: absolute;
  overflow: hidden;
  display: flex;
  width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
  cursor: pointer;
}

.send {
  position: absolute;
}

.send:after {
  content: "\e90d";
  display: inline-block;
  font: normal normal normal 14px/1 "icomoon";
  font-family: "icomoon";
  font-size: 22px;
  line-height: 50px;
  color: #069bff;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.free:before {
  content: "free";
  position: absolute;
  top: 3px;
  right: -45px;
  display: block;
  width: 80px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  background: linear-gradient(to right, #f56565, #f6ad55);
  color: #fff;
  font-size: 12px;
  transform: rotate(45deg) scale(0.85);
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -50%);
  width: 260%;
}
</style>
