import qs from "qs";

function stramFetch(question, context) {
    return new Promise((resolve, reject) => {

        const requestBody = qs.stringify(question);

        // 配置请求头
        const token = window.localStorage.getItem("Token-gpt-2");
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };
        if (token) {
            headers.Authorization = token;
        }

        fetch("https://czt666.cn:5054/api/stream/askchatgpt", {
            method: "POST",
            headers,
            body: requestBody
        })
            .then(response => {
                const reader = response.body.getReader();
                // console.log(response.headers.get('token'));
                if (response.headers.get('token')) {
                    localStorage.setItem("Token-gpt-2", response.headers.get('token'));
                }
                return new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({done, value}) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            });
                        }

                        push();
                    }
                });
            })
            .then(stream => {
                const reader = stream.getReader();
                const decoder = new TextDecoder();
                let prevalue = "";

                function readStream() {
                    reader.read().then(({done, value}) => {
                        if (done) {
                            // 对于最后一次返回去除 {"status" 之前的字符，方便进行 JSON.parse()
                            for (let i = 0; i < prevalue.length; i++) {
                                const str = prevalue.slice(i, i + 9);
                                // console.log(str);
                                if (str === "{\"status\"") {
                                    prevalue = prevalue.slice(i);
                                    break;
                                }
                            }
                            // console.log(prevalue);
                            // 格式化响应内容
                            let result = "";
                            try {
                                result = JSON.parse(prevalue);
                            } catch (error) {
                                result = {
                                    state: 3,
                                    message: "vue fetch readStream JSON解析错误",
                                };
                            }
                            resolve(result);
                            return;
                        }
                        let text = decoder.decode(value);
                        prevalue = text;
                        if(text.includes('[FINISH]')){
                            text = text.split('[FINISH]')[0]
                        }
                        // console.log(">>>", text, "<<<");
                        context.commit('STREAMUPDATEMESSAGE',text);
                        readStream();
                    });
                }

                readStream();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });
}

// const ask = '用js写一个轮播图'
// const message = [{ "role": "user", "content": ask }]
// const formdata = new FormData()
// formdata.append('ask', ask)
// formdata.append('messages', JSON.stringify(message))
// const data = new URLSearchParams(formdata.entries());
export default stramFetch;