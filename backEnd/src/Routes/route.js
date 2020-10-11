const express = require("express");
const mongoose = require("mongoose");
const path = require("path")

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../.././frontEnd/public/index.html"))
})

module.exports = router;