const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const body_parser = require("body-parser")

const app = express();


//Requiring the route
const route = require("./src/Routes/route")

//MIDDLEWARES
app.use(cors())
app.use(body_parser.urlencoded({ extended: false })) 
app.use(express.json());
app.use(route);


//MONGODB CONNECTION
//Online data Base to be created

// mongoose.connect(" ", { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Db connected")
// });

//Declaring the port for connection
const port = process.env.PORT || 3000;

//STARTING A SERVER
app.listen(port, () => {
    console.log("Server started on localhost:3000");
})