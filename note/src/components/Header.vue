<template>
    <div class="Header">
        <div class="Header_count w1170">
            <h1> <router-link to='/notelist'>云笔记</router-link> </h1>
            <!-- <span class="span_ys" @click="$router.push('/notelist')">点我进入笔记列表页</span> -->
            <el-button class="bt_ys" v-if="!$store.state.userinfo.avatar" @click="gowritenote">未登录</el-button>
            <el-dropdown class="down_box1" v-else   @command="handleCommand">
                <span  class="down_box2">
                    <div class="img_box">
                        <img :src="$store.state.userinfo.avatar" alt="">
                    </div>
                    <i class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="c">写笔记</el-dropdown-item>
                    <el-dropdown-item command="a">我的笔记</el-dropdown-item>
                    <el-dropdown-item command="b">个人信息</el-dropdown-item>
                    <el-dropdown-item command="d">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            async handleLogout(){
            const res = await this.$axios.get('/logout')
            console.log(res)
            let userinfo = {
                _id:'',
                avatar: '',
                email:'',
                username:'',
                password:'',
                }
            if(res.code == 200){
                this.$message.success('退出登录成功')
                this.$store.commit('CHANGEINFO', userinfo) //清空vuex中的数据
            }else{
                this.$store.commit('CHANGEINFO', userinfo) //清空vuex中的数据
                this.$message({
                type:"warning",
                message:'登录状态失效，自动退出登录'
                })
            }
            this.$router.push('/')
            
        },
            gowritenote(){
                this.$message.warning('需要先登录哟')
            },
            handleCommand(command) {
                // this.$message('click on item ' + command);
                switch(command){
                    case 'a':
                        this.$router.push(`/mynotelist?id=${this.$store.state.userinfo._id}`)
                        break;
                    case 'b':
                        this.$router.push(`/reviseuser?email=${this.$store.state.userinfo.email}`)
                        break;
                    case 'c':
                        this.$router.push('/writenote');
                        break;
                    case 'd':
                        this.handleLogout()
                        break;
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
    .span_ys{
        color: #fff;
        float: left;
        margin-left: 370px;
        font-size: 20px;
    }
    .bt_ys{
        float: right;
        margin-top: 5px;
    }
    .down_box1{
        float: right;
        height: 50px;
    }
    .down_box2{
        display: block;
        padding: 0 10px;
        .img_box{
            float: left;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            margin: 2.5px 5px 0 0;
            overflow: hidden;
        }
        img{
            // display: block;
            width: 45px;
            height: 45px;
        }
       
        
        /deep/{
                .el-icon-arrow-down{
                    padding-left: 4px;
                   
                }
            }
    }

}

</style>