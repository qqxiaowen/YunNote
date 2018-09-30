const {Router} = require("express")
const router = Router()
const category = require('../database/model/category')

// 查询所有的分类
router.get('/category',(req,res) => {
    category.find().then(data => {
        res.json({
            code:200,
            msg:'获取所有分类成功',
            data
        })

    })
})
// 查询一条的分类
router.get('/category/:id',(req,res) => {
    let {id} = req.params;
    category.findById(id).then(data => {
        res.json({
            code:200,
            msg:'获取一条分类成功',
            data
        })
    })
})
// 新建一条分类
router.post('/category',(req,res) => {
    let {catename} = req.body;
    if(catename){
        category.create({catename}).then(data => {
            res.json({
                code:'200',
                msg:'添加分类成功',
                data
            })
        })
    }else{
        res.json({
            msg:'400',
            msg:'缺少必要参数'
        })
    }
    
})

module.exports = router;