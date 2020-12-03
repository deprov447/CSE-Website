const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const base_64 = require("base-64");

const router = express.Router();

//Importing the model
const { seniorUserModel, fresherUserModel } = require("../../models/user");
const detailsModel = require("../../models/form");
const { mail } = require("../../emails/activation");

//Importing the  middleware
const auth = require("../../Middlewares/auth");
const restriction = require("../../Middlewares/restriction");
const activate = require("../../Middlewares/activateUser");

//IMPORTING STATIC DATA
const db_2nd = require("../../staticDb/db2nd.json"); //2nd Years Data
// const db_3rd = require("../../staticDB/db3rd.json") //3rd Years Data
// const db_4th = require("../../staticDB/db4th.json") //4th Years Data
const quizAnsDb = require("../../staticDb/quizAns.json");

//ROUTES FOR RENDERING STATIC PAGE
router.get("/", (req, res) => {
  res.render("../frontEnd/public/index");
});

router.get("/seniors", (req, res) => {
  res.render("../frontEnd/public/knowYourSeniors");
});

router.get("/introduce", async (req, res) => {
  const data = await detailsModel.find({});
  len = data.length;
  res.render("../frontEnd/public/juniorIntro.ejs", { data, len });
});

router.get("/gallery", (req, res) => {
  res.render("../frontEnd/public/gallery");
});

router.get("/roadmap", (req, res) => {
  res.render("../frontEnd/public/roadmap.ejs");
});
router.get("/QuizAns", (req, res) => {
  res.render("../frontEnd/public/quizAns.ejs");
});

router.get("/signUp", (req, res) => {
  res.render("../frontEnd/public/signUp.ejs");
});

router.get("/activate/:token", async (req, res) => {
  res.render("../frontEnd/public/validate.ejs");
});

//Route for creating a new User
router.post("/users/signUp", restriction, async (req, res) => {
  let user;
  try {
    if (req.body.isAdmin) user = new seniorUserModel(req.body);
    if (!req.body.isAdmin) user = new fresherUserModel(req.body);

    await user.save();
    const token = await user.authToken(user);

    const encodedValue = await base_64.encode(req.rollNo);
    await user.addEncodedValue(encodedValue);
    // mail(encodedValue, req.body.email)
    //Send hashed value through email

    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Route for user Login
router.post("/users/login", restriction, async (req, res) => {
  let user;
  try {
    if (req.body.isAdmin)
      user = await seniorUserModel.verifyUser(
        req.body.email,
        req.body.password,
        req.body.isAdmin
      );
    if (!req.body.isAdmin)
      user = await fresherUserModel.verifyUser(
        req.body.email,
        req.body.password,
        req.body.isAdmin
      );

    const token = await user.authToken(user);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/activate/:token/users", async (req, res) => {
  const tokens = await activate(req.params.token);
  res.send(tokens);
});

//Logout from a single device
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((data) => {
      return data.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send("Ërror");
  }
});

router.get("/adminVerify", auth, async (req, res) => {
  const user = req.user;

  if (req.isAdmin && user.isactivate.activate) {
    res.send({ admin: true, user: user.username });
  } else if (!req.isAdmin && user.isactivate.activate) {
    res.send({ admin: false, user: user.username });
  } else {
    res.status(400).send({});
  }
});

router.get("/form", function (req, res) {
  res.render("../frontEnd/public/form.ejs");
});

router.post("/formSubmit", auth, async (req, res) => {
  const user = req.user;
  if (!req.isAdmin && user.isactivate.activate) {
    req.body.name = user.username;
    const detail = new detailsModel(req.body);

    await detail.save();

    user.detailsId = detail._id;
    user.save();

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.get("/seniors/2nd", (req, res) => {
  res.render("../frontEnd/public/seniors2nd.ejs", {
    data: db_2nd,
    len: db_2nd.responses.length,
  });
});
router.get("/seniors/3rd", (req, res) => {
  res.render("../frontEnd/public/seniors3rd.ejs", { data: db_3rd });
});
router.get("/seniors/4th", (req, res) => {
  res.render("../frontEnd/public/seniors4th.ejs", { data: db_4th });
});

router.get("/QuizAns/data", auth, (req, res) => {
  const user = req.user;
  let data;
  if (req.query.roll != "") {
    data = findCorrespondent(req.query.roll);
  } else {
    const email = user.email;
    const rollNo = email.split("@");
    data = findCorrespondent(rollNo[0].slice(5, 7));
  }
  function findCorrespondent(params) {
    let index;
    for (index = 0; index < quizAnsDb.responses.length; index++) {
      if (
        parseInt(quizAnsDb.responses[index].ID.slice(5, 7)) == parseInt(params)
      ) {
        return quizAnsDb.responses[index];
      }
    }
    if (index == quizAnsDb.responses.length) {
      return "No correspondent";
    }
  }
  res.send({ data });
});

module.exports = router;
