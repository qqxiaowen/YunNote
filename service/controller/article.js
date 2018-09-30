const {Router} = require("express")
const router = Router()

const article = require('../database/model/article')

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


router.get('/article',(req,res) => {
    let {pn=1,size=10} = req.query;
    pn = parseInt(pn)
    size = parseInt(size)
    article.find().skip((pn-1)*size).limit(size)
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
            data
        })
    })
})



module.exports = router;