import router from "@/router";

const base = {};
base.install = function (Vue, options) {
  // 挂载到 vue.prototype 的函数
  Vue.prototype.changeRouter = function () {
    // someting
    console.log('changeRouter')

  };
};

export default base;
