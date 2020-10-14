const { seniorUserModel, fresherUserModel } = require("../models/user")

const activate = async (token) => {
    let user;
    let user2;
    const params = token;
    user = await seniorUserModel.findOne({
        "isactivate.hashedToken": params
    })

    if (!user) {
        user2 = await fresherUserModel.findOne({
            "isactivate.hashedToken": params
        })
        if (!user2) {
            res.send("Wrong activation code")
        } else {
            verified(user2)

        }
    }
    else {
        verified(user)

    }

}
function verified(user) {
    user.isactivate.activate = true;
    user.save();
}

module.exports = activate