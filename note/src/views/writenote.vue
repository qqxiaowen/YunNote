<template>
    <div>
         <el-breadcrumb style="margin: 15px 0;" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >写笔记页面</el-breadcrumb-item>
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
            
            <el-button type="primary" @click="handleSublit" :disabled="isdisabled">发布笔记</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.snow.css'
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    
    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
       components: {quillEditor},
    data() {
      return {
        category:'',
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
              name: 'img',
              action: '',
              response: (res) => {
                return res.info
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
        getCategory(){
            this.$axios.get('/category').then(res => {
                this.category = res.data
            })
        }
        
    },
    created() {
        this.getCategory()
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
