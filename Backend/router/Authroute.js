const { login,signin } = require('../controllers/AuthController')
const { loginValidation,signinValidation } = require('../middleware/AuthValidatation')

const router=require('express').Router()

router.post('/login',loginValidation,login)
router.post('/signin',signinValidation,signin)

module.exports=router;