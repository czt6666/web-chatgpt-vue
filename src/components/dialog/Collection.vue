<template>
  <div
      class="collect-box"
      :class="layout_mod ? 'moble' : ''"
      @click="modifyFavorites()"
  >
    <div class="inner">
            <span
                class="star"
                :class="is_cur_session_favorited ? 'favor' : ''"
            ></span>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "Collection",
  computed: {
    ...mapState({
      current_session_id: (state) =>
          state.moduleDialog.current_session_id,
      layout_mod: (state) => state.layout_mod,
    }),
    ...mapGetters("moduleDialog", ["is_cur_session_favorited"]),
  },
  methods: {
    modifyFavorites() {
      const session_id = this.current_session_id;
      this.$store.dispatch(
          "moduleDialog/collectionsession",
          session_id
      );
    },
  },
};
</script>

<style scoped>
.collect-box {
  width: 36px;
  height: 36px;
  float: right;
  margin-right: 40px;
  border-radius: 5px;
  background-color: #01020311;
  z-index: 12;
  cursor: pointer;
}

.moble {
  margin-right: 10px;
}
.gif{
  width: 20px;
}
.inner {
  width: 36px;
  height: 36px;
  border-radius: 100px;
  /* background-color: #01020312; */
}

.star {
  display: block;
  width: 36px;
  height: 36px;
  text-align: center;
}

.star:before {
  content: "\e906";
  display: inline-block;
  font: normal normal normal 14px/1 "icomoon";
  font-family: "icomoon";
  font-size: 20px;
  line-height: 36px;
  /* color: #10aeec; */
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.favor {
  color: #ffc12d;
}
</style>
