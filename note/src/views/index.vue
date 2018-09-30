<template>
    <div>
        <el-breadcrumb style="margin: 15px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        <div class="bigbox">
            <div class="letf_box fll">   
                <Banner></Banner>
                <Notelist :isshow2=true></Notelist>
            </div>
            <div class=" flr">
                <Userlogin></Userlogin>
            </div>
        </div>
    </div>
</template>

<script>
    import Banner from '@/components/Banner'
    import Notelist from '@/components/Notelist'
    import Userlogin from '@/components/Userlogin'
    export default {
        components:{
            Banner,
            Notelist,
            Userlogin
        }
        
    }
</script>

<style scoped>
.bigbox{
    margin-top: 50px;
}
.letf_box{
    width: 720px;
}
</style>