const {Router} = require("express")
const router = Router()

const article = require('../database/model/article')

// 发布笔记
router.post('/article',(req,res)=>{
    const {title,content,contentText,category} = req.body
    if(req.session.user){
        article.create({title,
            content,
            contentText,
            category,
            author:req.session.user._id
        }).then(data=>{
            res.json({
                code:200,
                msg:'发布笔记成功',
                data
            })
        })
    }else{
        res.json({
            code:401,
            msg:'需要登录才能发表笔记'
        })
    }
   
})


// 获取全部的笔记
router.get('/article',(req,res) => {
    let {pn=1,size=10} = req.query
    let count=""
    pn = parseInt(pn)
    size = parseInt(size)
    article.find().then(getcount => {
        count = getcount.length
    })
    article.find().skip((pn-1)*size).limit(size).sort({_id:-1})
    .populate({
        path:'category'
    })
    .populate({
        path:'author',
        select:'-password'
    })
    .then(data => {
        res.json({
            code:200,
            data,
            count
        })
    })
})
// 获取一条笔记
router.get('/article/:id',(req,res) => {
    let {id} = req.params
    article.findById({_id:id})
    .populate({
        path:'category'
    })
    .populate({
        path:'author',
        select:'-password'
    })
    .then(data => {
        let readnum = data.readnumber + 1
        article.updateOne({_id:id},{$set:{readnumber:readnum}}).then(data2 =>{
            console.log(data2)
        })
        res.json({
            code:200,
            msg:'成功获取一条文章',
            data
        })
    })
})
// 修改一条笔记
router.put('/article/:id',(req,res)=>{
    let {id} =req.params
    console.log(id)
    let {title,content,contentText,category} =req.body
    article.updateOne({_id:id},{$set:{title,content,contentText,category}}).then(data =>{
        res.json({
            code:200,
            msg:'修改成功'
        })
    })

})

// 删除一条笔记
router.delete('/article/:id',(req,res) => {
    let {id} = req.params
    if(id){
        article.deleteOne({_id:id}).then(data => {
            if(data.n == 0){
                res.json({
                    code:403,
                    msg:'传入id有误'
                })
            }else if(data.n == 1){
                res.json({
                    code:200,
                    msg:'删除成功',
                    data
                })
            }
            
        })
    }else{
        res.json({
            code:407,
            msg:'缺少必要参数'
        })
    }
})

// 获取某个用户的所有笔记
router.get('/article/user/:id',(req,res) => {
    let {id} = req.params
    article.find({author:id}).sort({_id:-1})
    .populate({
        path:'category'
    })
    // .populate({
    //     path:'author',
    //     select:'-password'
    // })
    .then(data => {
        res.json({
            code:200,
            msg:'获取单个用户的所有笔记成功',
            data
        })
       
    })

})




module.exports = router;