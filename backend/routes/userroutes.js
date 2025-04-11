const express=require('express')
const { login } = require('../controllers/UserController')
const authMiddleware = require('../middlewares/AuthMiddleWare')
const { ChatGroupController, getChatGroups, getChatGroupById, updateChatGroupById, deleteChatGroupById } = require('../controllers/ChatGroupController')
const router=express.Router()


router.post("/auth/login",login)
router.post('/chat-group',authMiddleware,ChatGroupController)
router.get('/chat-group', authMiddleware, getChatGroups);
router.get('/chat-group/:id', authMiddleware, getChatGroupById);
router.put('/chat-group/:id', authMiddleware, updateChatGroupById);
router.delete('/chat-group/:id', authMiddleware, deleteChatGroupById);


module.exports = router;