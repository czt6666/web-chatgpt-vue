<template>
    <div>
        <div class="head-box">
            <img :src="userImage" alt="" class="header-img" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: ["url"],
        computed: {
            userImage() {
                return this.url.replace(/(user\d+_2)\.jpg$/, "$1-image.jpg");
            },
        },
    };
</script>

<style scoped>
    /* 头像框 start */
    .head-box {
        overflow: hidden;
        position: relative;
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        margin-right: 10px;
        cursor: pointer;
    }

    .change-header {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        z-index: 9;
        opacity: 0;
        border-radius: 8px;
        transform: translate(-50%, -50%);
        background-color: #00000088;
    }

    .head-box:hover .change-header {
        opacity: 1;
        transform: translate(-50%, -50%);
        animation: dropdown 0.5s ease-in-out;
    }

    @keyframes dropdown {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .change-header::before {
        content: "更换头像";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        font: normal normal normal 14px/1 "icomoon";
        font-family: "icomoon";
        font-size: 16px;
        color: #e4e4e4cc;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .header-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
</style>
