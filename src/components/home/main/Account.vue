<template>
  <div class="infomation">
    <h2 class="info-title">账号信息</h2>
    <ul>
      <li class="info-item">
        <h3 class="subtitle">登录凭证</h3>
        <GetToken/>
      </li>
      <li class="info-item">
        <h3 class="subtitle">手机号找回账号</h3>
        <Login :info="recover_ways.phone"/>
        <h5 class="jump" @click="jumpToPhone" v-show="!user_all_info.phone">去绑定手机号</h5>
      </li>
      <li class="info-item">
        <h3 class="subtitle">邮箱找回账号</h3>
        <Login :info="recover_ways.email"/>
        <h5 class="jump" @click="jumpToEmil" v-show="!user_all_info.email">去绑定邮箱</h5>
      </li>
      <li class="info-item">
        <h3 class="subtitle">登录其它账号</h3>
        <Login :info="recover_ways.token"/>
      </li>
    </ul>
    <SwitchPage :info="context"/>
  </div>
</template>

<script>
import GetToken from "@/components/home/common/GetToken";
import Login from "@/components/home/common/Login";
import SwitchPage from "@/components/home/common/SwitchPage";
import {mapGetters, mapState} from "vuex";

export default {
  name: "Account",
  components: {GetToken, Login, SwitchPage},
  data() {
    return {
      context: {
        prev: {
          name: "钱包信息",
          router: "/home/wallet",
        },
        next: {
          name: "帮助反馈",
          router: "/home/help",
        },
      },
      // 找回账号的方式
      recover_ways: {
        phone: {
          ways: "phone",
          title: "通过手机号找回",
          color: "#24b9ff" // 按钮背景颜色
        },
        email: {
          ways: "email",
          title: "通过邮箱找回",
          color: "#24b9ff"
        },
        token: {
          ways: "token",
          title: "登录其它账号",
          color: "#ff4040"
        },
      },
    };
  },
  computed: {
    ...mapState({
      user_all_info: (state) => state.moduleUserinfo.user_all_info,
    }),
  },
  methods: {
    jumpToPhone() {
      this.$store.dispatch("changerouter", "/home");
      // this.$bus.$emit("focusFlexInput","phone")
    },
    jumpToEmil(){
      this.$store.dispatch("changerouter", "/home");
    }
  }
};
</script>

<style scoped></style>
