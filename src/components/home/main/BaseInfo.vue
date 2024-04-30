<template>
    <div class="infomation">
        <h2 class="info-title">个人信息</h2>
        <ul>
            <li class="info-item">
                <h3 class="subtitle">形象</h3>
                <UserHeader :url="user_all_info.head" />
                <span class="tips">首页点击头像可进行更改</span>
            </li>
            <li class="info-item">
                <h3 class="subtitle">UID</h3>
                {{ user_all_info.id }}
            </li>
            <li class="info-item">
                <h3 class="subtitle">昵称</h3>
                <div class="short-input">
                    <FlexableInput
                        :info="{
                            height: 1,
                            type: 'nick',
                            content: user_all_info.nick,
                            onsubmit: changeNick,
                        }"
                    />
                </div>
            </li>
            <li class="info-item">
                <h3 class="subtitle" :class="check_user_bind ? 'notice' : ''">手机号</h3>
                <div class="short-input">
                    <FlexableInput
                        :info="{
                            height: 1,
                            type: 'phone',
                            content: user_all_info.phone,
                            onsubmit: changePhone,
                        }"
                    />
                </div>
            </li>
            <li class="info-item">
                <h3 class="subtitle" :class="check_user_bind ? 'notice' : ''">邮箱</h3>
                <div class="short-input">
                    <FlexableInput
                        :info="{
                            height: 1,
                            type: 'email',
                            content: user_all_info.email,
                            onsubmit: changeEmail,
                        }"
                    />
                </div>
            </li>
            <!--      <li class="info-subtitle">邮箱</li>-->
            <!--      <li class="info-component area">-->
            <!--        <FlexableInput :info="{ height: 4 }"/>-->
            <!--      </li>-->
            <li class="info-item">
                <h3 class="subtitle">账号创建时间</h3>
                {{ user_creat_account_date }}
            </li>
        </ul>
        <SwitchPage :info="context" />
    </div>
</template>

<script>
    import UserHeader from "@/components/home/common/UserHeader";
    import FlexableInput from "@/components/input/FlexableInput";
    import SwitchPage from "@/components/home/common/SwitchPage";
    import { mapGetters, mapState } from "vuex";

    export default {
        name: "BaseInfo",
        components: { UserHeader, FlexableInput, SwitchPage },
        data() {
            return {
                context: {
                    prev: {
                        name: "",
                        router: "",
                    },
                    next: {
                        name: "钱包信息",
                        router: "/home/wallet",
                    },
                },
            };
        },
        methods: {
            changeNick(newnick) {
                if (this.user_all_info.nick === newnick) return;
                this.$store.dispatch("moduleUserinfo/changeusernick", newnick);
            },
            changePhone(val) {
                if (this.user_all_info.phone === val) return;
                // 合法性验证
                if (!this.checkPhoneNumber(val)) return;
                this.$store.dispatch("moduleUserinfo/changeuserphone", val);
            },
            changeEmail(val) {
                if (this.user_all_info.email === val) return;
                // 合法性验证
                if (!this.checkEmailNumber(val)) return;
                this.$store.dispatch("moduleUserinfo/changeuseremail", val);
            },
        },
        computed: {
            ...mapState({
                user_all_info: (state) => state.moduleUserinfo.user_all_info,
            }),
            ...mapGetters("moduleUserinfo", ["user_creat_account_date", "check_user_bind"]),
        },
        // created() {
        //   this.$bus.$on("focusFlexInput", (data)=>{
        //     console.log(data);
        //   });
        // },
        // destroyed() {
        //   this.$bus.$off("focusFlexInput")
        // }
    };
</script>

<style scoped>
    .short-input {
        width: 100%;
        max-width: 300px;
    }

    .area {
        width: 100%;
        max-width: 550px;
    }
    .notice {
        overflow: visible;
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: fit-content;
    }
    .notice:after {
        content: "";
        position: absolute;
        top: 4px;
        right: -4px;
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 10px;
        background-color: var(--notice-dot-color);
        z-index: 10;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2), inset 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>
