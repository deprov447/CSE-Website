const jwt = require("jsonwebtoken")
const { userModel } = require("../models/user");


const auth = async (req, res, next) => {

    try {

        const token = req.header("Authorization").replace("Bearer ", "");

        const code = jwt.verify(token, "key")

        const user = await userModel.findOne({
            _id: code._id,
            "tokens.token": token
        })

        if (!user) {
            throw new Error()
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(400).send("Cannot verify the user")
    }
}

module.exports = auth