// let handletime='你好啊，朋友'
function handletime(str){
        let time = new Date(str)
        let newtime = time.toLocaleDateString() +" "+ time.toTimeString().substr(0, 8)
        return newtime
    }

module.exports = handletime