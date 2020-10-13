const express = require("express");
const mongoose = require("mongoose");


const router = express.Router();

//Importing the model for user signUp
const { userSchema, seniorUserModel, fresherUserModel } = require("../../models/user")

//Importing the  middleware
const auth = require("../../Middlewares/auth");
const restriction = require("../../Middlewares/restriction")

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
        // const level = await restriction(req.body.email);

        if (req.admin) user = new seniorUserModel(req.body);
        if (!req.admin) user = new fresherUserModel(req.body);

        await user.save();
        const token = await user.authToken(user);

        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error.message)

    }

})

//Route for user Login
router.post("/users/login", restriction, async (req, res) => {
    let user;
    try {
        if (req.admin) user = await seniorUserModel.verifyUser(req.body.email, req.body.password);
        if (!req.admin) user = await fresherUserModel.verifyUser(req.body.email, req.body.password);

        const token = await user.authToken(user);
        res.send({ user, token })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//Testing the auth verification
router.get("/test", auth, (req, res) => {
    res.send(req.user)
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
