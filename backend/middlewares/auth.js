const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, error: error });
    }
}

module.exports = {
    authMiddleware
}