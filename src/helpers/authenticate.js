const { verify } = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const db = require("../db/db");

async function authorize(req, res, next) {

    const token = req.headers['authorization'].split(' ')[1];

    if(token) {
        try{
        const decoded = verify(token, JWT_SECRET);

        // get user with id from token 'sub' (subject) property
        const user = await db.User.findByPk(decoded.sub);
      
        // check user still exists
        if (!user) return res.status(401).json({ message: "Unauthorized" });
      
        // authorization successful, attach user details to request object
        req.user = user.get();
        next();
    } catch (e) {
        res.status(500).json({ message: 'Invalid Token' });
      }
    } else {
        res.status(500).json({ message: "Please provide token" });
    }
}

module.exports = authorize;
