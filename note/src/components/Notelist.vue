<template>
    <div class="Notelist">
        <ul>
            <li>
                <div class="top">
                    <div class="top_left ">
                        <img class="img_ys" src="/static/img/user.jpg" alt="">
                    </div>
                    <div class="top_right ">
                        <div class="info_top">
                            <h2>用户名：</h2>
                            <span>标题</span>
                        </div>
                        <div class="info_bot">
                            <span>浏览：0</span>
                            <span>回复：0</span>
                            <span>分类：0</span>
                        </div>
                        
                    </div>
                </div>
                <div class="bottom">
                    内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟
                </div>
            </li>
            <li>
                <div class="top">
                    <div class="top_left ">
                        <img class="img_ys" src="/static/img/user.jpg" alt="">
                    </div>
                    <div class="top_right ">
                        <div class="info_top">
                            <h2>用户名：</h2>
                            <span>标题</span>
                        </div>
                        <div class="info_bot">
                            <span>浏览：0</span>
                            <span>回复：0</span>
                            <span>分类：0</span>
                        </div>
                        
                    </div>
                </div>
                <div class="bottom">
                    内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟内容哟
                </div>
            </li>
            
        </ul>
    </div>
</template>

<script>
    export default {
        
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
        border-radius: 4px;
        overflow: hidden;
        .img_ys{
            width: 70px;
            height: 70px;
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
        padding-right: 10px;
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
</style>