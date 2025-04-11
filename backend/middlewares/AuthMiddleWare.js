const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ status: 401, message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: 403, message: "Forbidden: Invalid Token" });
            }
            req.user = decoded; // Attach decoded token data to request object
            next(); // Proceed to next middleware or route handler
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = authMiddleware;
