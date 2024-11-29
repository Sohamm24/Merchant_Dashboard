const { login,signin } = require('../controllers/AuthController')
const { loginValidation,signinValidation } = require('../middleware/AuthValidatation')
const { add } =require('../controllers/AddProducts')

const router=require('express').Router()

router.post('/login',loginValidation,login)
router.post('/signin',signinValidation,signin)
router.post('/add',add)

module.exports=router;