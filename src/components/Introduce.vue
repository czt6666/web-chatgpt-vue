<template>
    <div class="box" :style="{ paddingTop: layoyt_mod ? '30px' : '10px' }">
        <h1>欢迎来到czt666.cn，与ChatGPT聊天！</h1>
<!--        <h2>GPT3是ChatGPT的前身，您可以问他任何问题</h2>-->
        <div class="meth">
            <h3>使用方法：</h3>
            <ol>
                <li>1. 在底部对话框输入您的问题</li>
                <li>2. 等待ChatGPT回答，思考需要时间请您耐心等待</li>
            </ol>
        </div>
        <div class="demo">
            <h3>示例对话：</h3>
            <img src="../assets/img/demo.jpg" alt="" />
        </div>
        <div class="more">
            <h2 class="notoce">
                <!-- 近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中
                近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中
                近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中
                近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中
                近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中
                近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中
                近期openAI的接口被中国墙掉了，可能导致网页无法正常使用，相关问题正在解决中 -->
            </h2>
            <router-link to="course" class="a">注册ChatGPT教程</router-link>
            <router-link to="mianze" class="a">免责声明</router-link>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Introduce",
        computed: {
            ...mapState(["layoyt_mod"]),
        },
    };
</script>

<style scoped>
    .box {
        height: 100%;
        /* background-color: lightblue; */
    }
    h1,
    h2 {
        text-align: center;
    }
    h1 {
        font-size: 24px;
    }
    h2 {
        font-size: 14px;
        font-weight: 400;
    }
    .meth,
    .demo {
        width: 96%;
        max-width: 600px;
        margin: 30px auto 0;
    }
    .demo img {
        display: block;
        width: 100%;
        border: 2px dashed #222;
    }
    .more {
        width: 96%;
        max-width: 600px;
        margin: 20px auto 0;
    }
    .a {
        color: #3a5fcd;
        text-decoration: underline;
        margin-right: 20px;
    }
    .notoce {
        color: red;
        margin-bottom: 10px;
    }
</style>
