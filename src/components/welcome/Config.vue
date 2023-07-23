<template>
  <div>
    <div class="content"
         :style="{ flexDirection: layout_mod ? 'column' : 'row' }"
    >
      <!-- 问答配置 -->
      <ul
          class="clume"
          v-for="(options, index) of system_conf"
          :key="index"
          :style="{ marginLeft: layout_mod ? '0px' : '10px' }"
      >
        <!-- 头部 icon图标 -->
        <li class="inc">
          <img :src="options.icon" class="icon"/>
          <span class="title">{{ options.title }}</span>
        </li>
        <!-- 选项卡 -->
        <li
            class="cont"
            v-for="(option, idx) of options.content"
            :key="idx"
            :class="[length,tone].indexOf(option) !== -1? 'current':''"
            @click="changeOption(index, option)"
        >
          {{ option }}
        </li>
        <!--输入框-->
        <li v-if="options.input" class="cont role">
                    <textarea
                        class="input"
                        placeholder="假如你是"
                        v-model="role_discrib"
                        @input="changeOption(index, role_discrib)"
                    ></textarea>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "welcome",
  data() {
    return {
      main_title: "ChatGPT",
      system_conf: {
        length: {
          icon: "https://czt666.cn/gpt/img/length.png",
          title: "回答长度",
          content: ["最简回答", "写一段话", "论文模式"],
        },
        tone: {
          icon: "https://czt666.cn/gpt/img/example.png",
          title: "回答风格",
          content: ["猫娘风格", "派蒙风格", "随机风格"],
        },
        role: {
          icon: "https://czt666.cn/gpt/img/role.png",
          title: "角色扮演",
          input: true, // input为true 展示输入框不展示选项卡了
        },
      },
      role_discrib: "假如你是",
    };
  },
  computed: {
    ...mapState(["layout_mod"]),
    ...mapState({
      length: state => state.moduleDialog.system_describe.length,
      tone: state => state.moduleDialog.system_describe.tone,
    }),
  },
  methods: {
    changeOption(index, option) {
      // key: "length"; option: "最简回答"
      this.$store.commit("moduleDialog/FIXSYSTEM", {key: index, val: option});
      // 论文模式修改模型
      if(option === "论文模式"){
        this.$store.commit("moduleDialog/CHANGEMEDEL", 'gpt-3.5-turbo-16k');
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 96%;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 30px;
}

.content {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: #555;
  /* background-color: pink; */
}

/* 每一列 */
.clume {
  flex: 1;
  margin-left: 10px;
}

.clume:nth-child(1) {
  margin-left: 0;
}

/* item */
.clume li {
  margin-bottom: 10px;
}

/* item （icon) */
.inc .icon {
  display: block;
  height: 48px;
  margin: 0 auto;
}

/* item (content) */
.cont {
  padding: 10px;
  border-radius: 5px;
  background-color: #f3f3f3;
  cursor: pointer;
}


.role {
  width: 100%;
  min-height: 164px;
  height: 164px;
  /* height: calc(100% - 88px); */
  /* background-color: pink; */
}

.input {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background-color: transparent;
}

.input:focus {
  border: none;
  outline: none;
}

.current {
  background-color: #88ffd6;
}
</style>
