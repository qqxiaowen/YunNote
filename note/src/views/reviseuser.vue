<template>
    <div>
        <el-breadcrumb style="margin: 15px 0;" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改个人信息页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="revisebox">
            <el-form class="form_ys" ref="form" label-width="140px" label-position="left">
                <el-form-item label="您的邮箱:">
                    <el-input v-model="info.email" disabled></el-input>
                </el-form-item>
                <el-form-item label="您的用户名:">
                    <el-input v-model="info.username"></el-input>
                </el-form-item>

                <el-form-item label="点击修改您的头像:">
                    <!-- <img class="img_ys" :src="info.avatar" alt=""> -->
                    <el-upload
                    class="avatar-uploader"
                    method="psot"
                    action="https://up-z1.qiniup.com"
                    :data="token"
                    :on-success="handleAvatarSuccess"
                    :show-file-list="false"
                    >
                    <img v-if="info.avatar" :src="info.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-button type="primary" size="small" v-if="!isshowpassword" @click="handlepassword">点击修改密码</el-button>
                <div v-else>
                    <el-form-item label="请输入您的原密码:">
                        <el-input v-model="info.oldpassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入您的新密码:">
                        <el-input v-model="info.newpassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入:">
                        <el-input v-model="info.surepassword" @keyup.enter.native="reviseinfo" type="password"></el-input>
                    </el-form-item>
                </div>
                <el-button type="primary" size="small" @click="reviseinfo">点击修改</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                info:{
                    oldpassword:'',
                    newpassword:'',
                    surepassword:''
                },
                token:{token:''},
                imageUrl: '',
                isshowpassword:false
            }
        },
        methods:{
            gettoken(){
                axios.get('http://upload.yaojunrong.com/getToken').then(res =>{
                    this.token.token = res.data.data
                })
            },
            handleAvatarSuccess(res, file) {
                // console.log(res)
                this.info.avatar = res.url
            },
            reviseinfo(){
                if(this.info.newpassword !=this.info.surepassword){
                    this.$message.warning('两次输入的密码不一致')
                }else{
                    this.$axios.put(`/user/${this.$route.query.email}`,this.info).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        setTimeout(() => {
                            this.$router.push('/')
                        }, 500);
                        let userinfo = {
                                avatar: '',
                                email:'',
                                username:'',
                                password:'',
                                }
                        this.$store.commit('CHANGEINFO',userinfo) //清空vuex中的数据
                    }else{
                        this.$message.error(res.msg)
                        }
                    })
                }
                
            },
            handlepassword(){
                this.isshowpassword = true;
            },
            getuserinfo(){
                const {email} = this.$route.query
                // console.log(email)
                this.$axios.get(`/user/${email}`).then(res =>{
                    this.info = {...this.info,...res.data}
                })
            },


        },
        created(){
            this.getuserinfo()
            this.gettoken()
        }
        
    }
</script>

<style scoped>
.revisebox{
    width: 720px;
    margin: 20px auto 0;
    background: #fff;
    border-radius: 6px;
    padding: 20px;
}
/* .form_ys{
}
 */

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>