<template>
  <div v-show="show_login_popup">
    <ul class="switch">
      <li
          v-for="(item, index) of input_ways"
          :key="index"
          :class="index === current_switch ? 'current' : ''"
          @click="changeWay(index)"
      >
        {{ item.switch }}
      </li>
    </ul>
    <div class="content">
      <LoginInput :info="current_mode"/>
    </div>
    <h2 class="explan">
      登录遇到困难？
      <a :href="$link.account" target="_blank">
        <i>查看帮助文档</i>
      </a>
    </h2>
  </div>
</template>

<script>
import {mapState} from "vuex";
import LoginInput from "@/components/login/LoginInput";

export default {
  name: "Login",
  components: {LoginInput},
  data() {
    return {
      input_ways: {
        phone: {
          switch: "手机号",
          title: "输入您的手机号",
          callback: this.phoneCallback,
        },
        email: {
          switch: "邮箱",
          title: "输入您的邮箱",
          callback: this.emailCallback,
        },
        token: {
          switch: "登录凭证",
          title: "输入您的登录凭证",
          callback: this.tokenCallback,
        },
      },
      // 当前恢复账号的方式
      current_switch: "phone",
    };
  },
  computed: {
    ...mapState({
      show_login_popup: (state) => state.show_popup.show_login_popup,
    }),
    current_mode() {
      return this.input_ways[this.current_switch];
    },
  },
  methods: {
    changeWay(val) {
      this.current_switch = val;
    },
    phoneCallback(val) {
      // val 不为空
      if (!val) return;
      // 手机号错误
      if (!this.checkPhoneNumber(val)) return;
      this.$store.dispatch(
          "moduleUserinfo/recoveraccountbyphone",
          val
      );
    },
    emailCallback(val) {
      // val 不为空
      if (!val) return;
      if (!this.checkEmailNumber(val)) return;
      this.$store.dispatch(
          "moduleUserinfo/recoveraccountbyemail",
          val
      );
    },
    tokenCallback(val) {
      if (val) {
        this.$store.dispatch(
            "moduleUserinfo/recoveraccountbytoken",
            val
        );
      }
    }
  },
  mounted() {
    // 全局事件总线 接收恢复账号的方式
    this.$bus.$on("recoverWays", this.changeWay);
  },
  beforeDestroy() {
    // 在组件销毁之前，取消事件监听
    this.$bus.$off("recoverWays", this.changeWay);
  }
};


</script>

<style scoped>
.switch {
  display: flex;
  width: 100%;
  max-width: 560px;
  height: 40px;
  margin: 0 auto 10px;
  justify-content: space-between;
  border-bottom: 2px solid #888;
}

.switch > li {
  display: flex;
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid #888;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  /* background-color: lightblue; */
}

.current {
  background-color: #afd5ff;
}

.content {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  /* background-color: pink; */
}

.explan {
  display: block;
  text-align: center;
  font-size: 12px;
  font-weight: 200;
  margin-top: 8px;
  transform: translateY(35px);
  cursor: pointer;
}

.explan i {
  color: #1e90ff;
  text-decoration: underline;
}
</style>
