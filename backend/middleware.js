const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "Authentication issue"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({
                msg: "Token decoding failed"
            });
        }

    } catch (err) {
        return res.status(403).json({
            msg: err
        });
    }
};

module.exports = {
    authMiddleware
}