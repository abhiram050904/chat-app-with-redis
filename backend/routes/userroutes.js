const express=require('express')
const { login } = require('../controllers/UserController')
const authMiddleware = require('../middlewares/AuthMiddleWare')
const { ChatGroupController, getChatGroups, getChatGroupById, updateChatGroupById, deleteChatGroupById } = require('../controllers/ChatGroupController')
const { getAllUserDetails, addUserDetails } = require('../controllers/ChatGroupUserController')
const { getMessages, addMessage, deleteMessage } = require('../controllers/ChatsController')
const router=express.Router()

// Auth
router.post("/auth/login",login)

// Chat Groups
router.post('/chat-group',authMiddleware,ChatGroupController)
router.get('/chat-group', authMiddleware, getChatGroups);
router.get('/chat-group/:id', getChatGroupById);
router.put('/chat-group/:id', authMiddleware, updateChatGroupById);
router.delete('/chat-group/:id', authMiddleware, deleteChatGroupById);

// Group Users
router.get('/chat-group-users',getAllUserDetails)
router.post('/chat-group-users',addUserDetails)

// Chats (💬)
router.get('/chats/:groupId', getMessages);
router.post('/chats/:groupId', addMessage);
router.delete('/chats/:id', deleteMessage);

module.exports = router;