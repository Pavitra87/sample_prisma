const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// const jwtAuthMiddleware = async (req, res, next) => {
// 
//     const authorization = req.headers.authorization;
//     if (!authorization) {
//         return res.status(400).json({ error: "Token not found" })
//     }
//     console.log(authorization)
//     const token = authorization.split(' ')[1];
//     if (!token) return res.status(400).json({ error: "Unauthorized" })
// 
//     try {
//         // console.log(token)
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await prisma.user.findUnique({
//             where: { id: decoded.id }
//         });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid token' });
//         }
//         req.user = decoded;
//         next()
//         console.log(decoded)
// 
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ error: 'Invalid token' });
//     }
// }
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "30d" });
}

// const verifyTokenAndAdmin = (req, res, next) => {
//     jwtAuthMiddleware(req, res, () => {
//         console.log("Request user:", req.user); 
//         if (req.user && req.user.isAdmin) {
//             return next();
//         } else {
//             return res.status(403).json({ error: "You are not allowed to do that!" });
//         }
//     });
// };


module.exports = {  generateToken }