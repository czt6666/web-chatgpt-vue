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
        url: "/api/changeheader",
        method: "post",
        responseType: "json",
        data: qs.stringify(data),
    });
export const requserheader = () =>
    request({
        url: "/api/requserheader",
        method: "get",
        responseType: "json",
    });

// 会话模块
export const reqallsession = () =>
    request({
        url: "/api/querysessionbyuserid",
        method: "get",
        responseType: "json",
    });
export const deltsessionbyid = (data) =>
    request({
        url: "/api/deletesessionbyid",
        method: "get",
        responseType: "json",
        params:data,
    });
export const reqdialogbysessionid = (data) =>
    request({
        url: "/api/querydialogbysessionid",
        method: "get",
        responseType: "json",
        params:data,
    });
export const reqdeleteallsession = () =>
    request({
        url: "/api/deleteallsession",
        method: "get",
        responseType: "json",
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