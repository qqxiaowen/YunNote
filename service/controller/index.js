const {Router} = require("express")
const router = Router()
// const path = require('path')

const login = require('./login')
const register = require('./register')
const article = require('./article')
const category = require('./category')

router.use(login);
router.use(register);
router.use(article);
router.use(category);

module.exports = router;