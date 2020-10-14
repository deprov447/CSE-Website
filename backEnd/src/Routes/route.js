const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const router = express.Router();

//Importing the model for user signUp
const { userSchema, seniorUserModel, fresherUserModel } = require("../../models/user")

//Importing the  middleware
const auth = require("../../Middlewares/auth");
const restriction = require("../../Middlewares/restriction")
const activate = require("../../Middlewares/activateUser")

router.get("/", (req, res) => {
    res.render("../frontEnd/public/index")
})

router.get("/seniors", (req, res) => {
    res.render("../frontEnd/public/knowYourSeniors")
})

router.get("/introduce", (req, res) => {
    res.render("../frontEnd/public/juniorIntro.ejs")
})

router.get("/gallery", (req, res) => {
    res.render("../frontEnd/public/gallery")
})

router.get("/roadmap", (req, res) => {
    res.render("../frontEnd/public/roadmap.ejs")
})

//Router for creating a new User
router.post("/users/signUp", restriction, async (req, res) => {
    let user;
    try {


        if (req.body.isAdmin) user = new seniorUserModel(req.body);
        if (!req.body.isAdmin) user = new fresherUserModel(req.body);

        await user.save();
        const token = await user.authToken(user);

        const hashedValue = await bcrypt.hash(req.rollNo, 8)
        await user.addHashedValue(hashedValue);
        //Send hashed value through email

        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error.message)

    }

})

//Route for user Login
router.post("/users/login", restriction, async (req, res) => {
    let user;
    try {
        if (req.body.isAdmin) user = await seniorUserModel.verifyUser(req.body.email, req.body.password, req.body.isAdmin);
        if (!req.body.isAdmin) user = await fresherUserModel.verifyUser(req.body.email, req.body.password, req.body.isAdmin);

        const token = await user.authToken(user);
        res.send({ user, token })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//Testing the auth verification
router.post("/users/verify/:token", async (req, res) => {

    activate(req.params.token);
    res.send()

})

//Logout from a single device
router.post("/users/logout", auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((data) => {
            return data.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send("Ërror")
    }
})

module.exports = router;
