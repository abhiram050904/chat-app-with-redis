const prisma = require("../configurations/db")

const getMessages = async (req, res) => {
    const { groupId } = req.params;
  
    try {
      const messages = await prisma.chats.findMany({
        where: { group_id: groupId },
        orderBy: { created_at: 'asc' },
      });
  
      res.status(200).json({data:messages});
    } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };

  const addMessage = async (req, res) => {
    const { groupId } = req.params;
    const { message, name } = req.body;
  
    if (!message || !name) {
      return res.status(400).json({ error: 'Message and name are required' });
    }
  
    try {
      const newMessage = await prisma.chats.create({
        data: {
          group_id: groupId,
          message,
          name,
        },
      });
  
      res.status(201).json(newMessage);
    } catch (err) {
      console.error('Error adding message:', err);
      res.status(500).json({ error: 'Failed to add message' });
    }
  };

  const deleteMessage = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await prisma.chats.delete({
        where: { id },
      });
  
      res.status(200).json(deleted);
    } catch (err) {
      console.error('Error deleting message:', err);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  };

  module.exports={addMessage,getMessages,deleteMessage}