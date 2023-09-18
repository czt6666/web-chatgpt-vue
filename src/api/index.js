import request from "./request";
import qs from "qs";

// get 请求
// export const reqsomedata = () =>
//     request({
//         url: "/api/lyq/post/querypost",
//         method: "get",
//         responseType: "json",
//     });

// gpt模块
export const askchatgpt = (data) =>
    request({
        url: "/api/askchatgpt",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });

// 用户模块
export const changeheader = (data) =>
    request({
        url: "/api/user/changeheader",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
// 获取用户头像
export const requserheader = () =>
    request({
        url: "/api/user/requserheader",
        method: "get",
        responseType: "json",
    });
// 初始化配置信息
export const reqinitconfig = () =>
    request({
        url: "/api/reqinitconfig",
        method: "get",
        responseType: "json",
    });


// 会话模块
export const reqallsession = () =>
    request({
        url: "/api/session/querysessionbyuserid",
        method: "get",
        responseType: "json",
    });
export const reqallsessiondetail = () =>
    request({
        url: "/api/session/querysessiondetailbyuserid",
        method: "get",
        responseType: "json",
    });
export const deltsessionbyid = (data) =>
    request({
        url: "/api/session/deletesessionbyid",
        method: "get",
        responseType: "json",
        params: data,
    });
export const reqdialogbysessionid = (data) =>
    request({
        url: "/api/session/querydialogbysessionid",
        method: "get",
        responseType: "json",
        params: data,
    });
export const deleteunfavoritedsessions = () =>
    request({
        url: "/api/session/deleteunfavoritedsessions",
        method: "get",
        responseType: "json",
    });
export const collectionsession = (data) =>
    request({
        url: "/api/session/collectionsession",
        method: "get",
        responseType: "json",
        params: data,
    });


// 点击量模块
export const reqhitsindex = () =>
    request({
        url: "/api/hits/index",
        method: "get",
        responseType: "json",
    });
export const reqhitscourse = () =>
    request({
        url: "/api/hits/course",
        method: "get",
        responseType: "json",
    });
export const reqhitsmianze = () =>
    request({
        url: "/api/hits/mianze",
        method: "get",
        responseType: "json",
    });
// 获取用户全部信息
export const requserallinfo = () =>
    request({
        url: "/api/user/requserallinfo",
        method: "get",
        responseType: "json",
    });
// 获取用户余额
export const requserwallet = () =>
    request({
        url: "/api/user/requserwallet",
        method: "get",
        responseType: "json",
    });
// 修改昵称
export const changeusernick = (data) =>
    request({
        url: "/api/user/changeusernick",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
// 修改手机号
export const changeuserphone = (data) =>
    request({
        url: "/api/user/changeuserphone",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
// 修改邮箱
export const changeuseremail = (data) =>
    request({
        url: "/api/user/changeuseremail",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    })
// 计算sign 签名
export const calculatesign = (data) =>
    request({
        url: "/api/pay/calculatesign",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
// 响应异步通知
export const responceasync = (data) =>
    request({
        url: "/api/pay/responceasync",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
// 用手机号 恢复账号
export const recoveraccountbyphone = (data) =>
    request({
        url: "/api/user/recoveraccountbyphone",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
// 用邮箱 恢复账号
export const recoveraccountbyemail = (data) =>
    request({
        url: "/api/user/recoveraccountbyemail",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
export const recoveraccountbytoken = (data) =>
    request({
        url: "/api/user/recoveraccountbytoken",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });