<template>
  <div class="box" v-show="show_all_popu">
    <div class="bg" @click.self="closeAllPopup">
      <div class="popup">
        <div class="close" @click="closeAllPopup">
          <i class="close-icon"></i>
        </div>
        <!-- ... -->
        <About/>
        <Payment/>
        <Login/>
        <CopyToken/>
        <Collect/>
        <!-- ... -->
      </div>
    </div>
  </div>
</template>

<script>
import About from "@/components/popup/About";
import Payment from "@/components/popup/Payment";
import Login from "@/components/popup/Login";
import {mapGetters} from "vuex";
import CopyToken from "@/components/popup/CopyToken";
import Collect from "@/components/popup/Collect";
export default {
  name: "PopupIndex",
  components: {About, Payment, Login, CopyToken,Collect},
  computed: {
    ...mapGetters(["show_all_popu"]),
  },
  methods: {
    closeAllPopup() {
      this.$store.commit("CHANG_ALL_POPUP", false);
    },
  },
};
</script>

<style scoped>
.bg {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: #00000088;
}

.popup {
  position: relative;
  width: 100%;
  max-width: 750px;
  padding: 70px 10px;
  margin: 0 5px;
  border-radius: 10px;
  background-color: #f3f3f3;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
  rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

.close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  /* background-color: pink; */
}

.close i:after {
  content: "\e90f";
  display: inline-block;
  font: normal normal normal 14px/1 "icomoon";
  font-family: "icomoon";
  font-size: 26px;
  text-align: center;
  line-height: 40px;
  color: #888;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
