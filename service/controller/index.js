const {Router} = require("express")
const router = Router()
// const path = require('path')

const login = require('./login')
const user = require('./user')
const article = require('./article')
const category = require('./category')
const token = require('./token')

router.use(login);
router.use(user);
router.use(article);
router.use(category);
router.use(token);

module.exports = router;