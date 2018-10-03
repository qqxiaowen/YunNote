<template>
    <div>
        <el-breadcrumb style="margin: 15px 0 30px;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/notelist'}" >我的笔记页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table class="mytable_ys" :data="mynotelist" stripe style="width: 100%">
            <el-table-column class-name="notetitle" prop="title" label="笔记标题" width="280"></el-table-column>
            <el-table-column align="center" prop="category.catename" label="所属分类" width="180"></el-table-column>
            <el-table-column align="center" prop="createTime" label="发布时间" width="200"></el-table-column>
            <el-table-column align="center" prop="readnumber" label="浏览数" width="100"></el-table-column>
            <el-table-column align="center" prop="commonnumber.length" label="回复数" width="100"></el-table-column>
            <el-table-column align="center"   label="操作" >
                <template slot-scope="scope">
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
       
    </div>
</template>

<script>
    import handletime from '../package/time'
    export default {
       
        data(){
            return{
                mynotelist:[]
            }
        },
        methods:{
            getdata(){
                this.$axios.get(`/article/user/${this.$route.query.id}`).then(res => {
                    this.mynotelist = res.data
                    this.mynotelist.forEach(item => {
                        item.createTime = handletime(item.createTime)
                    });
                })
            }
        },
        created(){
            this.getdata()
        }
       
    }
</script>

<style scoped lang="scss">

.mytable_ys{
    border-radius: 6px;
    overflow: hidden;
    /deep/{
        .notetitle{
            height: 70px;
            padding-left: 10px;
            .cell{
            white-space: nowrap;

            }
        }
    }
}

</style>