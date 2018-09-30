<template>
    <div>
         <el-breadcrumb style="margin: 15px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/notelist'}" >笔记列表页</el-breadcrumb-item>
                <el-breadcrumb-item >笔记详情页</el-breadcrumb-item>
            </el-breadcrumb>
        <div class="article">
            <div class="userinfo clearfix" v-if="article.author">
                <div class="user_left">
                    <img :src="article.author.avatar" >
                </div>
                <div class="user_right">
                    <div class="row1">
                        {{article.author.username}}                   
                    </div>
                    <div class="row2">
                        <span>{{article.updateTime}}</span>阅读 {{article.readnumber}}
                    </div>
                </div>
            </div>
            <div class="content">
                <h1 class="content_title" v-text="article.title"></h1>
                <span v-html="article.content"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                article:''
            }
        },
        methods:{
            getarticle(){
                // console.log(this.$route.query)
                // console.log(this.$route.params)

                this.$axios.get(`/article/${this.$route.query.id}`).then(res => {
                    this.article = res.data
                })
            }
        },
        created(){
            this.getarticle()
        }
        
    }
</script>

<style scoped lang="scss">
.article{
    margin: 30px auto 0;
    width: 750px;
    background: #fff;
    border-radius: 6px;
    padding: 20px;
    .userinfo{
        .user_left{
            float: left;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            img{
                display: block;
                width: 60px;
                height: 60px;
                margin: 0 auto;
            }
        }
        .user_right{
            display: flex;
            height: 60px;
            justify-content: space-around;
            flex-direction: column;
        }
    }
}
.row1{
    color:#333;
    font-weight: 600;
    font-size: 16px;
}
.row2{
    color: #979797;
    font-size: 14px;
    span{
        padding-right: 10px;
    }
}
.content{
    line-height: 2;
    .content_title{
        text-align: center;
        color: #409eff;
        margin: 10px 0;
    }
    /deep/{
        span{
            h1,h2,h3,h4,h5,h6,p{
            padding:5px 0px
            }
        }
        
    }
       
    
}
</style>