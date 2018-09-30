<template>
    <div class="register">
        <h1>新用户注册</h1>
        <el-form ref="form" class="form_ys"  label-width="80px">
            <el-input placeholder="请输入用户名" v-model="userinfo.username"></el-input>
            <el-input placeholder="请输入密码"  v-model="userinfo.password"></el-input>
            <el-input placeholder="请输入邮箱号码"   @keyup.enter.native="register"  v-model="userinfo.email"></el-input>
            <el-button class="buttom_ys"  type="primary"  @click="register">注册</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userinfo:{
                    username:'',
                    password:'',
                    email:''
                }

            }
        },
        methods: {
            async register(){
                // console.log(this.userinfo)
                let res = await this.$axios.post('/user',this.userinfo)
                // console.log(res)
                if(res.code == 407){
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                        });
                }else if (res.code == 401 ){
                    this.$message({
                        message: res.msg,
                        type: 'warning'
                        });
                }else if (res.code == 200){
                    this.$message({
                        message: res.msg+"正在跳转首页",
                        type: 'success'
                        });
                    setTimeout(()=>{
                        this.$router.push('/')
                    },500)
                }
            }
        }
        
    }
</script>

<style scoped lang="scss">
.register{
    padding: 30px 150px;
    margin: 100px auto;
    width: 400px;
    height: 300px;
    background: #fff;
    text-align: center;
    border-radius: 6px;
    h1{
        font-size: 24px;
        padding-bottom: 20px;
        font-weight: 500;
    }
    .buttom_ys{
        width: 100%;
    }
}
.form_ys{
    .el-input{
        margin-bottom: 28px;
    }
}
</style>