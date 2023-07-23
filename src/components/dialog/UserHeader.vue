<template>
  <div
      class="userheader"
      :class="[is_user ? 'user' : 'robot', layout_mod ? 'mobile' : 'pc']"
  >
    <div
        class="header curr-header"
        @click="switchOption()"
        :style="{
                backgroundImage: `url('${displayheader}')`,
                backgroundSize: 'cover',
            }"
    ></div>
    <ul class="option" v-show="is_user && show_option">
      <li
          class="header option-header"
          v-for="(item, index) of getOptionHeader"
          :key="index"
          :style="{
                    backgroundImage: `url('${item}')`,
                    backgroundSize: 'cover',
                }"
          @click="changeheader(item)"
      ></li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UserHeader",
  props: ["logitem"],
  data() {
    return {
      headers: [
        "https://czt666.cn/gpt/img/user1.jpg",
        "https://czt666.cn/gpt/img/user2.jpg",
        "https://czt666.cn/gpt/img/user3.jpg",
        "https://czt666.cn/gpt/img/user4.jpg",
      ],
      openaiheader: "https://czt666.cn/gpt/img/openai.png",
      show_option: 0,
    };
  },
  methods: {
    switchOption() {
      this.show_option = !this.show_option;
    },
    changeheader(val) {
      this.$store.dispatch("changeheader", val);
      this.show_option = 0;
    },
  },
  computed: {
    ...mapState(["layout_mod"]),
    ...mapState({
      userheader: state => state.moduleUserinfo.user_all_info.head
    }),
    getOptionHeader() {
      let arr = [];
      for (let i = 0; i < 4; i++) {
        if (this.userheader !== this.headers[i]) {
          arr.push(this.headers[i]);
        }
      }
      return arr;
    },
    displayheader() {
      if (this.is_user) {
        return this.userheader;
      } else {
        return this.openaiheader;
      }
    },
    is_user() {
      return this.logitem.role === "user";
    },
  },
};
</script>

<style scoped>
.userheader {
  overflow: visible;
  /* position: relative; */
  width: 60px;
  /* display: flex; */
  flex-direction: row;
}

.userheader.mobile {
  width: 50px;
}

.header {
  float: left;
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
}

.robot .curr-header {
  margin-right: 20px;
  background: url("../../assets/img/openai.png") no-repeat;
  background-size: cover;
}

.user .curr-header {
  margin-right: 20px;
  background: url("../../assets/img/user1.jpg") no-repeat;
  background-size: cover;
}

.user.mobile .curr-header {
  margin-right: 12px;
}

.option {
  position: relative;
  top: 0;
  left: -10px;
  width: 500px;
  z-index: 999;
}

.option-header {
  float: left;
  background-color: #ccc;
  margin-left: 5px;
}
</style>
