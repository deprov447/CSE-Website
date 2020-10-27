const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const base_64 = require("base-64")

const router = express.Router();

//Importing the model 
const { seniorUserModel, fresherUserModel } = require("../../models/user")
const detailsModel = require("../../models/form")
const { mail } = require("../../emails/activation")

//Importing the  middleware
const auth = require("../../Middlewares/auth");
const restriction = require("../../Middlewares/restriction")
const activate = require("../../Middlewares/activateUser")
const upload = require("../../profile");
const admin = require("../../Middlewares/admin")

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
router.get("/QuizAns", (req, res) => {
    res.render("../frontEnd/public/quizAns.ejs")
})

router.get("/signUp", (req, res) => {
    res.render("../frontEnd/public/signUp.ejs")
})

router.get("/activate/:token", async (req, res) => {

    res.render("../frontEnd/public/validate.ejs")

})

//Router for creating a new User
router.post("/users/signUp", restriction, async (req, res) => {
    let user;
    try {


        if (req.body.isAdmin) user = new seniorUserModel(req.body);
        if (!req.body.isAdmin) user = new fresherUserModel(req.body);

        await user.save();
        const token = await user.authToken(user);

        const encodedValue = await base_64.encode(req.rollNo);
        await user.addEncodedValue(encodedValue);
        mail(encodedValue, req.body.email)
        //Send hashed value through email

        res.send({})
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
        res.status(200).send({ token })
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get("/activate/:token/users", async (req, res) => {

    const tokens = await activate(req.params.token);
    res.send(tokens)

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

//form details of freshers
router.post("/users/info", auth, upload.single("profilePic"), async (req, res) => {
    const user = req.user;

    const detail = new detailsModel({
        profilePic: req.file.buffer,
        penName: req.body.penName,
        message: req.body.message
    })

    await detail.save();

    user.detailsId = detail._id;
    user.save();



    res.send("Saved")
})

//Send the file throught this route
router.get("/seniors/info", async (req, res) => {
    res.sendFile()

})

router.get("/adminVerify", admin, async (req, res) => {
    if (req.isAdmin) {
        res.send({ admin: true })
    } else {
        res.send({ admin: false })
    }
})

//Update form if required

// router.put("/users/info/update", auth, upload.single("profilePic"), async (req, res) => {
//     const user = req.user;

//     const update = await detailsModel.updateOne({ _id: user.detailsId[0] }, req.body);

//     res.send("Succes")

// })

module.exports = router;
