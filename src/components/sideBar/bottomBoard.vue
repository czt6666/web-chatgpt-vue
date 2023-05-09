<template>
  <div class="bottom">
    <dialogItem
        :info="{
                title: can_delete_session ? '确认清空' : '清空对话',
                click: this.deleteAllSession,
            }"
    >
      <!-- 头部 icon-->
      <img src="@/assets/svg/trash.png" v-show="!can_delete_session"/>
      <img src="@/assets/svg/yes.svg" v-show="can_delete_session"/>
    </dialogItem>

    <!--聊天风格 开始按钮-->
    <div :style="{border: can_select_style ? '1px solid #4c4d4f' : 'none'}" class="border">
      <dialogItem
          :info="{
                title: can_select_style ? '收起风格列表' : '设置聊天风格',
                current: can_select_style,
                click: this.showSessionStyle,
            }"
      >
        <img src="@/assets/svg/style.svg" v-show="!can_select_style"/>
        <img src="@/assets/svg/down.svg" v-show="can_select_style"/>
      </dialogItem>

      <!--可选聊天风格列表 start -->
      <dialogItem
          v-for="item of session_style"
          :key="item.id"
          v-show="can_select_style"
          :info="{
                title: item.title,
                current: 0,
                passdata: {style: item.style},
                click:switchSessionStyle,
            }"
      >
        <!-- 头部 icon-->
        <img :src="item.icon"/>
      </dialogItem>
      <!--可选聊天风格列表 end -->
    </div>

    <dialogItem
        :info="{
                title: can_signout ? '确认清空信息' : '清空登录信息',
                click: this.signOut,
            }"
    >
      <!-- 头部 icon-->
      <img src="@/assets/svg/signout.png" v-show="!can_signout"/>
      <img src="@/assets/svg/yes.svg" v-show="can_signout"/>
    </dialogItem>
  </div>
</template>

<script>
import dialogItem from "@/components/sideBar/dialogItem";
import {mapState} from "vuex";

export default {
  name: "bottomBoard",
  components: {dialogItem},
  data() {
    return {
      session_style: [{
        id: 1,
        style: "maoniang",
        title: "猫娘风格",
        icon: "https://czt666.cn/gpt/img/cat.svg",
      }, {
        id: 2,
        style: "paimeng",
        title: "派蒙风格",
        icon: "https://czt666.cn/gpt/img/paimeng.png",
      }, {
        id: 3,
        style: "zuihan",
        title: "醉汉风格",
        icon: "https://czt666.cn/gpt/img/drink.svg",
      }]
    };
  },
  methods: {
    deleteAllSession() {
      this.$store.dispatch("moduleSideBar/deleteallsession");
    },
    showSessionStyle() {
      this.$store.commit("moduleSideBar/SHOWSESSIONSTYLE");
    },
    signOut() {
      this.$store.commit("moduleSideBar/SIGNOUT");
    },
    switchSessionStyle(info) {
      let data = info.passdata.style;
      this.$store.commit("moduleSideBar/SWITCHSESSIONSTYLE", data);
      this.$store.commit("moduleDialog/NEWCHAT", data);
    },
  },
  computed: {
    ...mapState({
      can_delete_session: state => state.moduleSideBar.can_delete_session,
      can_select_style: state => state.moduleSideBar.can_select_style,
      can_signout: state => state.moduleSideBar.can_signout,
    })
  },
};
</script>

<style scoped>
.bottom {
  width: 100%;
  padding-top: 8px;
  border-top: 1px solid #4c4d4f;
}

.bottom img {
  width: 24px;
  height: 24px;
}

.border {
  border-radius: 5px;
}
</style>
