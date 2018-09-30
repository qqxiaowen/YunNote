<template>
    <div class="Banner">
        <img src="/static/img/banner.jpg" alt="">
        <span>十五亿人都在用云笔记^_^</span>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="scss">
.Banner{
    width: 720px;
    height: 340px;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    img{
        width: 720px;
        height: 340px;
    }
    span{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 20px;
        color: #fff;
        background: rgba(0,0,0,.4)
    }

}
</style>