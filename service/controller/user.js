var express = require('express');
var router = express.Router();

var user = require('../database/model/user')

// 注册用户
router.post('/user',(req,res)=>{
    let {username,password,email} = req.body
    user.findOne({email}).then(findemail => {
        if(findemail){
            res.json({
                code:407,
                msg:'该邮箱已被注册'
            })
        }else{
            if(!(username&&password&&email)){
                res.json({
                    code:401,
                    msg:'缺少必要信息'
                })
            }else{
                const avatarNumber = Math.floor(Math.random()*9)
                const avatar = `http://pgdt2gm62.bkt.clouddn.com/avatar${avatarNumber}.png`

                user.create({avatar,username,password,email}).then(data=>{
                    res.json({
                        code:200,
                        msg:'注册成功',
                        data,
                    })
                })
            }
        }
    })
})

// 获取单个用户信息
router.get('/user/:email',(req,res) => {
    const {email} = req.params
    user.findOne({email}).then(data => {
        res.json({
            code:200,
            msg:'获取一个用户的信息',
            data
        })
    })
})

// 修改单个用户信息
router.put('/user/:email',(req,res) => {
    let {email} = req.params
    let {oldpassword,newpassword,username,avatar} = req.body
        if(!oldpassword&& !newpassword){
            req.session.user = null;
            user.updateOne({email},{$set:{username,avatar}}).then(revise1 => {
                res.json({
                    code:200,
                    msg:'修改成功,请重新登录',
                    revise1
                })
            })
        }else{
            user.findOne({email}).then(data => {
                if(data.password != oldpassword){
                    res.json({
                        code:403,
                        msg:'原密码错误'
                    })
                }else{
                    req.session.user = null;
                    user.updateOne({email},{$set:{username,avatar,password:newpassword}}).then(revise2 => {
                        res.json({
                            code:200,
                            msg:'修改成功，请重新登录',
                            revise2
                        })
                    })
                }
            })
        }
        
})




module.exports = router;