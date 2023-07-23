import router from "@/router";
import { Message } from 'element-ui';

const base = {};
base.install = function (Vue, options) {
  // 挂载到 vue.prototype 的函数
  Vue.prototype.changeRouter = function () {
    // someting
    console.log('changeRouter')
  };
  Vue.prototype.checkPhoneNumber = function (val){
    if(!isPhoneNumber(val)){
      Message({
        message: '手机号错误',
        type: 'error'
      });
      return 0
    }
    return 1
  };
  Vue.prototype.checkEmailNumber = function (val){
    if(!isEmail(val)){
      Message({
        message: '邮箱错误',
        type: 'error'
      });
      return 0
    }
    return 1
  };
};

function isPhoneNumber(input) {
  // 使用正则表达式进行手机号验证
  const phoneNumberPattern = /^1[3456789]\d{9}$/;
  return phoneNumberPattern.test(input);
}

function isEmail(input) {
  // 使用正则表达式进行邮箱验证
  const emailPattern = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+(\.[A-Za-z]{2,})+$/;
  return emailPattern.test(input);
}


export default base;
