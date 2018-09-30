var express = require('express');
var router = express.Router();

var user = require('../database/model/user')

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
                const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`

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




module.exports = router;