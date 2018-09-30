var express = require('express');
var router = express.Router();

var user = require('../database/model/user')

router.post('/login',(req,res)=>{
    let {username,password} = req.body
    user.findOne({email:username}).then(data=>{
        console.log(data)
        if(!data){
            res.json({
                code:401,
                msg:'用户不存在'
            })
        }else if(data.password !=  password){
            res.json({
                code:400,
                msg:'密码错误'
            })
        }else if(data.password ==  password){
            req.session.user = data;
            let qdata = data
            qdata.password = ''
            res.json({
                code:200,
                msg:'登录成功',
                data:qdata
            })
        }else{
            res.json({
                code:407,
                msg:'未知错误'
            })
        }
    })
    
})

router.get('/logout',(req,res)=>{
    if(req.session.user){
        req.session.user = null;
        res.json({
            code:200,
            msg:'退出登录成功'
        })
    }else{
        res.json({
            code:401,
            msg:'未登录下不能退出登录'
        })
    }
})
module.exports = router;