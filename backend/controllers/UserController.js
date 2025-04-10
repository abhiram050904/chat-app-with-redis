const prisma = require("../configurations/db")
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const login = async (req, res) => {
    try {
        const { name, email, provider, oauth_id, image } = req.body;

        let findUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!findUser) {
            findUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    provider,
                    oauth_id,
                    image
                }
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: findUser.id, email: findUser.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "7d" } // Token expiry (7 days)
        );

        // Set Authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        console.log(findUser)
        return res.status(200).json({ 
            success: true, 
            user: findUser, 
            token 
        });

    } catch (err) {
        console.error("Error in login:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { login };
