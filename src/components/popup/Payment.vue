<template>
  <div v-show="show_payment_popup">
    <div class="content">
      <PaymentIndex/>
    </div>
<!--    <h2 class="explan">-->
<!--      充值需要人工服务，请确保钱包余额充足，以免影响使用-->
<!--    </h2>-->
  </div>
</template>

<script>
import PaymentIndex from "@/components/payment";
import {mapState} from "vuex";

export default {
  name: "Payment",
  components: {PaymentIndex},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      show_payment_popup: (state) =>
          state.show_popup.show_payment_popup,
    }),
  },
  watch: {
    show_payment_popup: function () {
      if (this.show_payment_popup) {
        this.$store.dispatch("moduleUserinfo/requserwallet");
      }
    }
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  max-width: 560px;
  margin: 0 auto -30px;
}

.explan {
  display: block;
  text-align: center;
  font-size: 12px;
  font-weight: 200;
  margin-top: 8px;
  transform: translateY(35px);
  text-decoration: underline;
  cursor: pointer;
}

.explan i {
  color: #1e90ff;
}
</style>
