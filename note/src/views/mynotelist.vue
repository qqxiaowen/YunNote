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
                    <el-button type="primary" size="small" @click="handledetail(scope.row._id)">查看</el-button>
                    <el-button type="primary" size="small" @click="$router.push(`/reviseaRticle?id=${scope.row._id}`)">编辑</el-button>
                    <el-button type="danger" size="small" @click="deletemynote(scope.row._id)">删除</el-button>
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
            handledetail(id){
                this.$router.push(`/article?id=${id}`)
            },
            deletemynote(id){
                 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.delete(`/article/${id}`).then(res => {
                            if(res.code == 200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getdata()
                            }
                        })
                        

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
            },
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