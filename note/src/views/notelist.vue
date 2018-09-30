<template>
    <div>
        <el-breadcrumb style="margin: 15px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/notelist'}" >笔记列表页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="notelist">
        <div style="margin-top: 15px;">
                <el-input placeholder="请输入笔记标题" v-model="userscreen"  class="input-with-select">
                </el-input>
            </div>
                <Notelist :screen="userscreen"></Notelist>
        </div>
       
    </div>
</template>

<script>
    import Notelist from '@/components/Notelist'
    export default {
        components:{
            Notelist
        },
        data(){
            return{
                userscreen:'',
            }
        }
       
    }
</script>

<style scoped>
.search{
    margin-top: 20px;
}
.btn_ys{
    float: right;
}
.notelist{
    width: 900px;
    margin: 0 auto;
}
</style>