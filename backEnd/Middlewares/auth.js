const jwt = require("jsonwebtoken")
const { seniorUserModel, fresherUserModel } = require("../models/user");
const TOKEN_KEY = require("../config/dev.json").TOKEN_KEY

const auth = async (req, res, next) => {
    let user;
    try {

        const token = req.header("Authorization").replace("Bearer ", "");

        const code = jwt.verify(token, TOKEN_KEY)

        if (code.isAdmin) {
            user = await seniorUserModel.findOne({
                _id: code._id,
                "tokens.token": token
            })
        } else {
            user = await fresherUserModel.findOne({
                _id: code._id,
                "tokens.token": token
            })
        }



        if (!user) {
            throw new Error();
        }

        req.isAdmin = code.isAdmin
        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.status(400).send("Cannot verify the user")
    }
}

module.exports = auth