const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const router = express.Router();

//Importing the model for user signUp
const { userSchema, userModel } = require("../../models/user")

router.get("/", (req, res) => {
    res.render("../frontEnd/public/index")
})

router.get("/seniors",(req,res)=>{
    res.render("../frontEnd/public/knowYourSeniors")
})

router.get("/introduce",(req,res)=>{
    res.render("../frontEnd/public/juniorIntro.ejs")
})

router.get("/gallery",(req,res)=>{
    res.render("../frontEnd/public/gallery")
})

router.get("/roadmap",(req,res)=>{
    res.render("../frontEnd/public/roadmap.ejs")
})

//Router for creating a new User
router.post("/users/signUp", async (req, res) => {
    const user = new userModel(req.body);
    try {
        await user.save();
        const token = await user.authToken(user);
        res.send({ user, token });
    } catch (error) {
        res.sendStatus(500);
    }

})

//Route for user Login
router.post("/users/login", async (req, res) => {
    try {
        const user = await userModel.verifyUser(req.body.email, req.body.password);
        const token = await user.authToken(user);
        res.send({ user, token })
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router;
