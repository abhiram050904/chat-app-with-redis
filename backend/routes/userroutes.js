const express=require('express')
const { login } = require('../controllers/UserController')
const router=express.Router()


router.post("/auth/login",login)

module.exports={router}
