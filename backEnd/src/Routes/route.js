const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const router = express.Router();

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

module.exports = router;