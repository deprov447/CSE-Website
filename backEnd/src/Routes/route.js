const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontEnd/public/index.html"))
})

router.get("/seniors",(req,res)=>{
    res.sendFile(path.join(__dirname, "../../../frontEnd/public/knowYourSeniors.html"))
})

router.get("/introduce",(req,res)=>{
    res.sendFile(path.join(__dirname, "../../../frontEnd/public/juniorIntro.html"))
})

router.get("/gallery",(req,res)=>{
    res.sendFile(path.join(__dirname, "../../../frontEnd/public/gallery.html"))
})


router.get("/roadmap",(req,res)=>{
    res.sendFile(path.join(__dirname, "../../../frontEnd/public/roadmap.html"))
})
module.exports = router;