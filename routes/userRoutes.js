const router = require('express').Router();
const {signup, login,update,fetchusers,showUser,deleteUser}=require('../controller/userController')


router.post("/register",signup)
router.post("/login",login)
router.put('/:id',update)
router.get('/',fetchusers)
router.get('/:id',showUser)
router.delete('/:id',deleteUser)

module.exports=router