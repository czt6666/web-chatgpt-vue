<template>
    <li
        class="dialog"
        :class="{
            border: info.border,
            current: info.current,
            notice: info.notice,
        }"
        @click="info.click(info)"
        :style="info.mystyle"
    >
        <!-- svg icon -->
        <slot></slot>
        <span class="title">{{ info.title }}</span>
        <slot name="end"></slot>
    </li>
</template>

<script>
    export default {
        name: "dialogItem",
        props: ["info"],
    };
</script>

<style scoped>
    .dialog {
        overflow: hidden;
        display: flex;
        width: 100%;
        /* width: 244px; */
        height: 40px;
        border-radius: 5px;
        justify-content: start;
        align-items: center;
        padding-left: 8px;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .dialog:hover {
        background-color: var(--sidebar-hover-color);
    }

    .border {
        border: 1px solid var(--sidebar-border-color);
    }

    .current {
        background-color: var(--sidebar-current-color);
    }

    .current:hover {
        background-color: var(--sidebar-current-hover-color);
    }

    .dialog span {
        overflow: hidden;
        flex: 1;
        color: var(--sidebar-text-color);
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .notice {
        overflow: visible;
        position: relative;
        top: 0;
        left: 0;
    }
    .notice:after {
        content: "";
        position: absolute;
        top: -2px;
        right: -2px;
        display: block;
        width: 9px;
        height: 9px;
        border-radius: 10px;
        background-color: var(--notice-dot-color);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2),
            inset 0px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .title {
        margin-left: 8px;
    }
</style>
