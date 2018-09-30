<template>
  <div class="right-box">
    <div class="login-box"  v-if="!$store.state.userinfo.username">
      <div class="item">
        <input type="text" v-model="formdata.username"  placeholder="邮箱">
      </div>
      <div class="item">
        <input type="password" v-model="formdata.password" @keyup.enter="login" placeholder="密码">
      </div>
      <div class="item">
        <el-button type="primary" class="_el-btn" @click="login">
          登录
        </el-button>
      </div>
      <div class="item">
        <el-button class="_el-btn" @click="$router.push('/register')">
          注册
        </el-button>
      </div>
    </div>
    <div class="user-box" v-else>
      <div class="user-box-item user-icon">
        <img :src="$store.state.userinfo.avatar">
      </div>
      <div class="name-item">
        {{$store.state.userinfo.username}} 
      </div>
      <div class="email-item">
          {{$store.state.userinfo.email}}
      </div>
      <div>
        <el-button type="warning" style="width: 100%;margin-top: 10px;" @click="handleLogout">
          退出登录
        </el-button>
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: "UserBox",
    data(){
        return{
            formdata:{
                username:'',
                password:''
            }

        }
    },
    methods:{
        login(){
            if(!(this.formdata.username && this.formdata.password)){
              this.$message({
                        message: '请输入用户名或密码',
                        type: 'warning'
                        });
            }else{
              this.$axios.post('/login',this.formdata).then(res=>{
                if(res.code == 200){
                  this.$message.success(res.msg)
                  this.$store.commit('CHANGEINFO',res.data)
                }else{
                  this.$message.error(res.msg)

                }
              })
            }
        },
        async handleLogout(){
          const res = await this.$axios.get('/logout')
          console.log(res)
          let userinfo = {
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
        }
    }

  }
</script>

<style scoped lang="scss">
  .right-box {
    box-sizing: border-box;
    width: 360px;
    background: #fff;
    border-radius: 4px;
    padding: 21px 30px;
  }

  /*用户登陆框*/
  .item {
    margin-top: 30px;

    ._el-btn {
      width: 100%;
    }

    & > input {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      padding: 14px;
      outline: none;
    }
  }
  /*用户登陆框结束*/

  /*用户信息框*/
  .user-box {
    padding-top: 30px;
    .user-icon {
      text-align: center;
      img {
        width: 100px;
        height: 100px;
      }
    }

    .name-item,.email-item {
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
      color: #333;
      font-weight: 400;
      line-height: 36px;
    }
  }

  /*用户登陆框结束*/


</style>
