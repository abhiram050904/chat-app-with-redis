const prisma=require('../configurations/db')

    const ChatGroupController= async(req, res) =>{
        try {
            const { title, passcode } = req.body;
            const user = req.user;

            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            console.log('the user is :',user)
            await prisma.chatGroup.create({
                data: {
                    title,
                    passcode,
                    user: {
                        connect: { id: user.userId } 
                    }
                }
            });

            return res.status(200).json({ message: "Chat group created successfully" });
        } catch (err) {
            console.error("Error creating chat group:", err);
            return res.status(500).json({ message: "Something went wrong. Please try again" });
        }
    }

    const getChatGroups = async (req, res) => {
        try {
            const user = req.user;
    
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
    
            const chatGroups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.userId
                },
                orderBy:{
                    created_at:"desc"
                }
            });
    
            return res.status(200).json({message:`chats fetched successfully`,data:chatGroups});
        } catch (err) {
            console.error("Error fetching chat groups:", err);
            return res.status(500).json({ message: "Something went wrong. Please try again" });
        }
    };



    const getChatGroupById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.user;
    
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
    
            const chatGroup = await prisma.chatGroup.findUnique({
                where: {
                    id: id,
                }
            });
    
            if (!chatGroup) {
                return res.status(404).json({ message: "Chat group not found" });
            }
    
            return res.status(200).json(chatGroup);
        } catch (err) {
            console.error("Error fetching chat group:", err);
            return res.status(500).json({ message: "Something went wrong. Please try again" });
        }
    };
    


    const updateChatGroupById = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, passcode } = req.body;
            const user = req.user;
    
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
    
            const chatGroup = await prisma.chatGroup.update({
                where: {
                    id: id.toString(),
                    user_id: user.userId, // Ensure the user owns the chat group
                },
                data: {
                    id,
                    title,
                    passcode
                }
            });
    
            return res.status(200).json({ message: "Chat group updated successfully", chatGroup });
        } catch (err) {
            console.error("Error updating chat group:", err);
            return res.status(500).json({ message: "Something went wrong. Please try again" });
        }
    };

    const deleteChatGroupById = async (req, res) => {
        try {
            const { id } = req.params; // Get chat group ID from URL params
            const user = req.user; // Get authenticated user
    
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
    
            const chatGroup = await prisma.chatGroup.delete({
                where: {
                    id: id, // Ensure ID is a string (UUID)
                    user_id: user.userId, // Ensure the user owns the chat group
                }
            });
    
            return res.status(200).json({ message: "Chat group deleted successfully", chatGroup });
        } catch (err) {
            console.error("Error deleting chat group:", err);
    
            // Handle case where chat group does not exist
            if (err.code === "P2025") {
                return res.status(404).json({ message: "Chat group not found" });
            }
    
            return res.status(500).json({ message: "Something went wrong. Please try again" });
        }
    };
    
    

module.exports= {ChatGroupController,getChatGroups,getChatGroupById,updateChatGroupById,deleteChatGroupById};
