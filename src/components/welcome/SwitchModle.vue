<template>
  <div>
    <div class="cont">
      <label
          class="switch-container"
          :class="{ on: switchState }"
          @click="toggleSwitch"
      >
        <div
            class="switch-button"
            :style="{ animationPlayState: animationState }"
        ></div>
        <ul class="modbox">
          <li class="mod">
                        <span
                            class="modtext gpt3"
                            v-show="!switchState"
                            :style="{ animationPlayState: animationState }"
                        >GPT3.5</span>
          </li>
          <li class="mod">
                        <span
                            class="modtext gpt4"
                            v-show="switchState"
                            :style="{ animationPlayState: animationState }"
                        >GPT-4</span>
          </li>
        </ul>
      </label>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      animationState: "paused", // 初始状态为暂停
    };
  },
  methods: {
    toggleSwitch() {
      this.$store.dispatch("moduleDialog/togglemodle");

      if (this.animationState === "paused") {
        this.animationState = "running";
      }
    },
  },
  computed: {
    ...mapState({
      model: (state) => state.moduleDialog.model,
    }),
    switchState() {
      return this.model === "gpt-4";
    },
  },
};
</script>

<style scoped>
.cont {
  height: 48px;
  margin: -10px;
}

.switch-container {
  overflow: hidden;
  display: inline-block;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 6px;
  background-color: var(--welcome-page-option-background-color);
  border-radius: 5px;
  cursor: pointer;
}

.modbox {
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.modbox .mod {
  display: block;
  text-align: center;
  width: 50%;
  line-height: 36px;
}

.switch-button {
  width: 50%;
  height: 36px;
  background-color: var(--welcome-modle-switch-default-background-color);
  border-radius: 5px;
  transform: translateX(0%);
  animation: return 0.3s linear;
  animation-play-state: paused;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.switch-container.on .switch-button {
  transform: translateX(100%);
  animation: previous 0.3s 0s linear;
  animation-play-state: paused;
}

.modtext {
  animation: fadeIn 0.3s linear;
  animation-play-state: paused;
  color: #fff;
}
.modtext:before{
  display: inline-block;
  font: normal normal normal 14px/1 'icomoon';
  font-family: 'icomoon';
  font-size: 14px;
  /* color: #10aeec; */
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 3px;
}
.modtext.gpt3:before{
  content: "\e9a9";
}
.modtext.gpt4:before{
  content: "\e9b5";
}
.on .switch-button {
  background-color: var(--welcome-modle-switch-active-background-color);
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  0.0000000000000000000000001% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes previous {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  .0000000000000000000000001% {
    transform: translateX(0%);
    opacity: 1;
  }
  50% {
    width: 60%;
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes return {
  0% {
    transform: translateX(0%);
  }
  .0000000000000000000000001% {
    transform: translateX(100%);
  }
  50% {
    width: 60%;
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
