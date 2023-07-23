<template>
  <div class="infomation">
    <h2 class="info-title">钱包信息</h2>
    <ul>
      <li class="info-item">
        <h3 class="subtitle">余额</h3>
        {{ user_wallet }}
        <!--                <span class="info-tips">-->
        <!--                    充值需要人工服务，请确保钱包余额充足，以免影响使用！-->
        <!--                </span>-->
      </li>
      <li class="info-item">
        <h3 class="subtitle">会员</h3>
        {{ user_member }}
      </li>
      <li class="info-item">
        <h3 class="subtitle">充值</h3>
        <div class="goods">
          <PaymentIndex/>
        </div>
      </li>
      <li class="info-item">
        <h3 class="subtitle">充值失败</h3>
        <span class="info-link-title">填写调查问卷：</span>
        <a :href="$link.payment_dcwj" target="blank" class="link">{{
            $link.payment_dcwj
          }}</a>
      </li>
      <li class="info-item">
        <h3 class="subtitle">免费获取额度</h3>
        <p>进行【问题反馈】获取5元额度！</p>
        <p>
          <a
            :href="$link.recommend"
            target="blank"
            class="link"
        >{{ $link.recommend }}</a
        >
        </p>
        <p class="info-tips">免费额度24小时内到账</p>
      </li>
<!--      <li class="info-item">-->
<!--        <h3 class="subtitle">活动</h3>-->
<!--        <ol class="info-ol">-->
<!--          <li>为网站提出建议免费获取5元额度</li>-->
<!--        </ol>-->
<!--      </li>-->
    </ul>
    <SwitchPage :info="context"/>
  </div>
</template>

<script>
import PaymentIndex from "@/components/payment";
import SwitchPage from "@/components/home/common/SwitchPage";
import {mapGetters, mapState} from "vuex";

export default {
  name: "Wallet",
  components: {PaymentIndex, SwitchPage},
  data() {
    return {
      context: {
        prev: {
          name: "个人信息",
          router: "/home",
        },
        next: {
          name: "账号信息",
          router: "/home/account",
        },
      },
    };
  },
  computed: {
    ...mapState({
      user_all_info: (state) => state.moduleUserinfo.user_all_info,
    }),
    ...mapGetters("moduleUserinfo", ["user_wallet", "user_member"]),
  },
};
</script>

<style scoped>
.goods {
  width: 100%;
  max-width: 550px;
}
</style>
