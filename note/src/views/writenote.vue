<template>
    <div>
         <el-breadcrumb style="margin: 15px 0;" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!isrevise" >写笔记页面</el-breadcrumb-item>
            <el-breadcrumb-item v-else >修改笔记页面</el-breadcrumb-item>
            
        </el-breadcrumb>
        <div class="write_box">
            <h2>标题：</h2>
            <el-input placeholder="请输入标题" v-model="formdata.title"></el-input>
            <h2 class="h2_two">内容：</h2>
            <div class="quill-wrap">
                <quill-editor
                v-model="formdata.content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="handlechange"
                >
                </quill-editor>
            </div>
            <div class="category">
                <span class="category_bt">标签：</span>
                <el-radio-group v-model="formdata.category" :data="category" size='mini'>
                    <el-radio-button v-for="(item,index) in category" :label="item._id" :key="index" >{{item.catename}}</el-radio-button>
                </el-radio-group>
            </div>
            
            <el-button type="primary" v-if="!isrevise" @click="handleSublit" :disabled="isdisabled">发布笔记</el-button>
            <el-button type="primary" v-else @click="resiveSublit">修改笔记</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.snow.css'
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    import axios from 'axios'
    
    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
       components: {quillEditor},
    data() {
      return {
        isrevise:false,

        category:'',
        token:'',
        formdata:{
            content: '',
            contentText:'',
            title:'',
            category:''
        },
        // 富文本框参数设置
        editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action: 'https://up-z1.qiniup.com',
              response: (res) => {
                return res.url
              },
              change: (xhr, formData) => {
                    // xhr.setRequestHeader('myHeader','myValue')
                    console.log(this.token)
                        formData.append('token', this.token)
                    } 
             
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    methods: {
        gettoken(){
            this.$axios.get('/getToken').then(res =>{
                this.token = res.data
            })
        },
        handlechange({ quill, html, text }){
            let newtext = text.substring(0,200) + '...'
            this.formdata.contentText = newtext
        },
        handleSublit(){
            // console.log(this.formdata)
            this.$axios.post('/article',this.formdata).then(res => {
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.$router.push('/notelist')
                }
            })
        },
        resiveSublit(){
            // console.log('1')
            this.$axios.put(`article/${this.$route.query.id}`,this.formdata).then(res => {
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.$router.push(`/mynotelist?id=${this.formdata.author._id}`)
                }
            })
        },
        getCategory(){
            this.$axios.get('/category').then(res => {
                this.category = res.data
            })
        }
        
    },
    created() {
        this.getCategory()
        this.gettoken()
        if(this.$route.path == '/reviseaRticle'){
            this.isrevise = true;
            this.$axios.get(`article/${this.$route.query.id}`).then(res =>{
                this.formdata = res.data
                this.formdata.category = res.data.category._id
            })
        }
    },
    computed:{
        isdisabled(){
            if(this.formdata.category){
                return false
            }else{
                return true
            }
        }
    }
        
    }
    
</script>

<style scoped lang="scss">
.write_box{
    background: #fff;
    margin: 20px auto 0;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 6px;
    h2{
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
    }
    .h2_two{
        margin-top: 10px;
    }
    .category{
        padding: 10px 0;
    }
    .category_bt{
        font-size: 14px;
        padding: 20px 0;
        color:#409eff;
    }
}

</style>
<style>
.ql-editor{
    min-height: 280px;
}
</style>
