<template>
    <div class="Notelist">
        <!-- <router-link :to="{name:'article',params:{id:123456789}}">点击测试跳转</router-link> -->
        <ul>
            <li v-for="(item,index) in screendata" :key="index" @click="$router.push(`/article?id=${item._id}`)">
                <div class="top">
                    <div class="top_left ">
                        <img class="img_ys" :src="item.author.avatar" alt="">
                    </div>
                    <div class="top_right">
                        <div class="info_top clearfix">
                            <h2>用户名：<span>{{item.author.username}}</span></h2>
                            <h2>标题: <span>{{item.title}}</span></h2>
                        </div>
                        <div class="info_bot">
                            <span>浏览：{{item.readnumber}}</span>
                            <span>回复：{{item.commonnumber.length}}</span>
                            <span>分类：{{item.category.catename}}</span>
                        </div>
                        
                    </div>
                </div>
                <div class="bottom">
                    {{item.contentText}}
                </div>
            </li>
        </ul>
        <el-pagination
                v-if="(!isshow2)&&(!screen)"
                background
                @current-change="pagding"
                layout="prev, pager, next"
                :page-size="paging.size"
                :total="count">
                </el-pagination>
        <div v-if="isshow2" class="isshow" @click="$router.push('/notelist')">
            点击查看更多笔记
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            isshow2:{
                type:Boolean
            },
            screen:{
                type:String 
            }
        },
        data(){
            return{
                data:'',
                count:1,
                paging:{
                    pn:1,
                    size:4,
                },
                
            }
        },
        methods:{
            getdata(){
                this.$axios.get('/article',this.paging).then(res => {
                    if(!this.isshow2){
                        this.data = res.data
                        this.count = res.count
                    }else{
                        this.data = res.data.slice(0,1)
                    }
                    
                })
            },
            pagding(page){
                // console.log(page)
                this.paging.pn = page;
                this.getdata()
            }
            
        },
        created(){
            this.getdata()
            // console.log(this.isshow2)
        },
        computed:{
            screendata(){
                if(!this.screen){
                    return this.data
                }else{
                     return this.data.filter(item=>{
                        return (item.title.indexOf(this.screen) !=-1)
                    })
                }
            }
        }

        
        
    }
</script>

<style scoped lang = "scss">
.Notelist{
    margin-top: 20px;
    border-radius: 4px;
    background: #fff;
    padding: 20px;
   li{
       margin-bottom: 26px;
       cursor: pointer;
   }
}
.top{
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    height: 70px;
    .top_left{
        margin-right:14px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        .img_ys{
            width: 70px;
            height: 70px;
            display: block;
        }
    }
}
.top_right{
    width: 100%;
}
.info_top{
    margin-bottom: 14px;
    h2{
        float: left;
        color: #409eff;
        font-size: 15px;
        span{
            color: #333;
            font-weight: normal;
        }
    }
    h2:first-child{
        padding-right: 10px;
        margin-right: 10px;
        border-right: 1px solid #000;
    }
    span{
        font-size: 15px;
        padding-left: 10px;
    }
}
.info_bot{
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    background: #bbbbbb;
    span{
        padding:  0 30px 0 10px;
    }
}
.bottom{
    width: 680px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

}
.isshow{
    margin-top: -12px;
    float: left;
    font-weight: 700;
    color: #409eff;
    cursor: pointer;
}
.isshow:hover{
    color: #409e40;
}
</style>