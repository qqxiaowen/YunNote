<template>
    <div>
       <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容"  class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <Notelist></Notelist>
    </div>
</template>

<script>
    import Notelist from '@/components/Notelist'
    export default {
        components:{
            Notelist
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
</style>