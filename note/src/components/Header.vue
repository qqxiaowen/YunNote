<template>
    <div class="Header">
        <div class="Header_count w1170">
            <h1> <router-link to='/'>云笔记</router-link> </h1>
            <span @click="$router.push('/notelist')">点我进入笔记列表页</span>
            <el-button class="bt_ys" @click="gowritenote">写笔记</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            gowritenote(){
                 if(this.$store.state.userinfo.username){
                    this.$router.push('/writenote')
                }else{
                    this.$message.warning('需要先登录哟')
                }
            }
        }
        
    }
</script>

<style scoped lang="scss">
.Header{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #409eff;
}
.Header_count{
    margin: 0 auto;
    h1 a{
        font-size: 26px;
        color: #fff;
        font-weight: 500;
        float: left;
        text-decoration: none;
    }
    span{
        color: #fff;
        float: left;
        margin-left: 370px;
        font-size: 20px;
    }
    .bt_ys{
        float: right;
        margin-top: 5px;
    }
}
</style>