const jwt = require("jsonwebtoken")



const admin = async (req, res, next) => {
    let user;
    try {

        const token = req.header("Authorization").replace("Bearer ", "");

        const code = jwt.verify(token, "key")

        if (code.isAdmin) {
            req.isAdmin = true;
        } else {
            req.isAdmin = false;
        }
        
        next();

    } catch (error) {
        res.status(400).send("Cannot verify the user")
    }
}

module.exports = admin