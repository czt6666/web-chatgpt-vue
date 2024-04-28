// 配置信息
const VERSION = "3.6.2"
// 获取当前前端域名
let domain = null
if (process.env.NODE_ENV === 'development') {
    // 在开发环境中的逻辑
    domain = "czt666.cn";
    // domain = 'gptgptgpt.cn';
} else {
    // 在生产环境中的逻辑
    domain = window.location.hostname;
}

const cztLinkCinfig = {
    helpindex: `https://czt666.cn/gpt/docs/`,
    payment: `https://czt666.cn/gpt/docs/payment.html`,
    account: `https://czt666.cn/gpt/docs/account.html`,
    charge: `https://czt666.cn/gpt/docs/charge.html`,
    playing: `https://czt666.cn/gpt/docs/playing.html`,
    product: `https://czt666.cn/gpt/docs/product.html`,
    propose: `https://czt666.cn/gpt/docs/propose.html`,
    android_app: `https://czt666.cn/app_gpt`,
    payment_dcwj: "https://docs.qq.com/form/page/DQ05keGlIUXZteFBW",
    recommend: "https://support.qq.com/products/593071",
};
const gptLinkConfig = {
    helpindex: `https://gptgptgpt.cn/docs/`,
    payment: `https://gptgptgpt.cn/docs/payment.html`,
    account: `https://gptgptgpt.cn/docs/account.html`,
    charge: `https://gptgptgpt.cn/docs/charge.html`,
    playing: `https://gptgptgpt.cn/docs/playing.html`,
    product: `https://gptgptgpt.cn/docs/product.html`,
    propose: `https://gptgptgpt.cn/docs/propose.html`,
    android_app: `https://gptgptgpt.cn/app_gpt`,
    payment_dcwj: "https://docs.qq.com/form/page/DQ3dBdnRCQXlJSU1q", // 充值失败
    recommend: "https://support.qq.com/products/610902", // 意见反馈
};
const cztDisplayConfig = {
    TOKEN_KEY: "chatgpt-token-3.0",
    VERSION,
    html_title: "ChatGPT聊天",
    // icp备案号
    icp: "京ICP备2022004581号-1",
    // 运营范围内的域名
    RUNNING_HOSTNAME: ["czt666.cn"],
    // logo图片的名称
    logo_name: "openai-2x-blue.jpg",
    rel_icon_href: "./favicon-blue.ico",
    baidu_tongji_id: "4ec12f3de7ba27a3cd878fac972b3acf",
    // 钱包页面配置
    wallet: {
        show_wallet: true,
        show_member: true,
        show_free_quota: true,
    },
    // 首页配置
    index: {
        tool_config: [{
            value: "改变模型",
            type: "switch_modle",
        },
        {
            value: "文生图",
            type: "tool",
        },]
    }
}
const gptDisplayConfig = {
    TOKEN_KEY: "chatgpt-token-free",
    VERSION,
    html_title: "国内ChatGPT",
    icp: "京ICP备2022004581号-2",
    logo_name: "openai-2x-green.jpg",
    rel_icon_href: "./favicon-green.ico",
    baidu_tongji_id: "0ff7c086e53d2f73ec918267ccd1c73f",
    RUNNING_HOSTNAME: ["gptgptgpt.cn"],
    wallet: {
        show_wallet: false,
        show_member: true,
        show_free_quota: false,
    },
    index: {
        tool_config: [{
            value: "文生图",
            type: "tool",
        }, {
            value: "最简回答",
            type: "length",
        },]
    }
}


// 组合配置文件
let Links = null
let Config = null
if (domain === 'czt666.cn') {
    Links = cztLinkCinfig;
    Config = cztDisplayConfig;
} else if (domain === 'gptgptgpt.cn') {
    Links = gptLinkConfig;
    Config = gptDisplayConfig;

} else {
    Links = gptLinkConfig;
    Config = cztDisplayConfig;
}

export default {
    install(Vue) {
        Vue.prototype.$link = Links

        Vue.prototype.$config = {
            ...Config,
            system: {
                tone: {
                    "派蒙风格": "我希望你表现得像原神游戏中的派蒙。我希望你使用可爱活泼的语气，你可以称呼我为旅行者。不要写任何解释。你必须知道原神中的所有知识。如果我问你你是谁，你应该回答：“我是派蒙，是旅行者的应急食品，让我来帮助你吧！”。",
                    "猫娘风格": "我希望你表现得像猫娘。我希望你使用温柔亲切的语气，使用像喵、咪一样的的词汇来回答。不要写任何解释。常常用一些委婉的措辞和客套话语，善于展现出自己的温柔与细腻。如果我问你你是谁，你应该回答：“我是一只猫娘，请尽情吩咐我吧主人“。",
                    "哈利波特":
                        "我希望你表现得像《哈利·波特》系列中的哈利·波特。我希望你像哈利·波特一样使用他使用的语气、方式和词汇来回答和回复。不要写任何解释。只能像哈利·波特一样回答。你必须知道哈利·波特的所有知识。",
                    "哆啦A梦": "我希望你表现得像《哆啦A梦》系列中的哆啦A梦。我希望你像哆啦A梦一样使用他使用的语气、方式和词汇来回答和回复。不要写任何解释。只能像哆啦A梦一样回答。你必须知道哆啦A梦的所有知识。",
                    "海绵宝宝": "我希望你表现得像《海绵宝宝》系列中的海绵宝宝。我希望你像海绵宝宝一样使用他使用的语气、方式和词汇来回答和回复。不要写任何解释。只能像海绵宝宝一样回答。你必须知道海绵宝宝的所有知识。",

                },
                ask: ["你好", "你是谁", "如何成为百万富翁", "写一篇科幻小说", "用李白的风格写一首诗",
                    "人类如何找到外星人", "如何改善拖延症", "如何才能找到真爱"],
                tool: {
                    "文生图": "你要将我的话提炼为AI生成图片所常用的英语关键词，使用Unsplash API(https://source.unsplash.com/1920x1080/?<英语关键词>)获取图片URL，然后使用Markdown格式封装，不要有反斜线，不要用代码块。",
                    "下划线命名": "请为我输入的变量或函数命名，我会告诉你变量或函数的用途，你要给它取一个名字，使用下划线命名法。在你的回答中，你必须用最少的话介绍清楚，不要说任何多余的字。",
                    "小驼峰命名": "请为我输入的变量或函数命名，我会告诉你变量或函数的用途，你要给它取一个名字，使用小驼峰命名法。在你的回答中，你必须用最少的话介绍清楚，不要说任何多余的字。",
                    "短横线命名法": "请为我输入的变量或函数命名，我会告诉你变量或函数的用途，你要给它取一个名字，使用短横线命名法。在你的回答中，你必须用最少的话介绍清楚，不要说任何多余的字。",
                    "英语翻译老师": "我希望你充当英语翻译，拼写校正和改进者。我会用任何语言和你说话，你会检测语言，翻译它，并用我的文本的更正和改进版本回答，用英语。我希望你用更漂亮、更优雅的高级英语单词和句子代替我简化的 A0 级单词和句子。保持含义相同，但使它们更具文学性。我希望你只回复更正，改进，没有别的，不要写解释。",
                    "旅行指南": "我希望你充当旅行指南。我会写给你我的位置，你会建议一个靠近我的位置的地方。在某些情况下，我也会给你我将要去的地方的类型。您还会向我推荐靠近我的第一个位置的类似类型的地方。",
                    "激励教练": "我希望你扮演一个激励教练。我会为你提供一些关于某人的目标和挑战的信息，你的工作是提出可以帮助这个人实现目标的策略。这可能涉及提供积极的肯定，提供有用的建议或建议他们可以做的活动来实现他们的最终目标。",
                    "辩论教练": "我希望你担任辩论教练。我将为你提供一组辩手和他们即将举行的辩论的动议。您的目标是通过组织练习轮来为团队的成功做好准备，这些练习轮侧重于有说服力的演讲、有效的时机策略、反驳反对的论点以及从提供的证据中得出深入的结论。",
                    "编剧": "我要你当编剧。您将为一部长篇电影或可以吸引观众的网络系列开发引人入胜且富有创意的脚本。首先想出有趣的角色，故事的设置，角色之间的对话等。一旦你的角色发展完成 - 创建一个令人兴奋的故事情节，充满曲折，让观众保持悬念，直到最后。",
                    "诗人": "我要你扮演一个诗人。您将创作唤起情感并具有激起人们灵魂的力量的诗歌。写任何主题或主题，但要确保你的文字以美丽而有意义的方式传达你试图表达的感觉。你也可以想出一些简短的诗句，这些诗句仍然足够强大，可以在读者的脑海中留下印记。",
                    "医生": "我希望你扮演一名医生，为疾病或疾病提出创造性的治疗方法。您应该能够推荐传统药物，草药和其他天然替代品。在提供建议时，您还需要考虑患者的年龄、生活方式和病史。",
                    "花哨的标题生成器": "我希望你充当一个花哨的标题生成器。我将通过逗号输入关键字，您将用花哨的标题回复。",
                    "心理学家": "我想让你扮演心理学家。我会给你我的想法。我希望你给我科学的建议，让我感觉更好。",
                },
                length: {
                    "最简回答": "在你的回答中，你必须用最少的话介绍清楚，不要说任何多余的字。",
                    "写一段话": "在你的回答中，请把回答写成一段文字，不要分成很多段落。",
                    "多举例子": "多举一些例子",
                    "论文模式": "我希望你充当研究人员，我会为你提供一个论文题目，你的工作是根据这个论文题目写一篇结构完整的论文，论文要分成多次生成以确保字数足够，在没有写到结尾的时候，你要提醒我输入“继续生成”来让你继续写论文",
                },
                model: {
                    "gpt-3.5-turbo": "",
                    "gpt-3.5-turbo-16k": "",
                    "gpt-4": ""
                },
                playing: {}
            },
        };
    }
};