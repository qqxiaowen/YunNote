const {Router} = require("express")
const router = Router()
const qiniu =  require('qiniu')

router.get('/getToken',(req,res) => {
    var accessKey = 'tm5nyRWCdbnHxV6GeQC88gOcpTXCG3OX9YU024XZ';
    var secretKey = 'ecNxbd-OVRBhT-d9aQbovtX_OjyqrxE0kzYnXgni';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: 'yunnote',
        returnBody: '{"key":"$(key)","hash":"$(etag)","url":"http://pgdt2gm62.bkt.clouddn.com/$(key)"}',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    // console.log(uploadToken)
    res.header('Access-Control-Allow-Origin','*') //设置cors跨域
    res.json({
        code:200,
        data:uploadToken
    })

})


module.exports = router;