let MONGO_URL = require("../config/dev.json").MONGO_URL;


//Delete this before hosting
MONGO_URL = "mongodb://localhost:27017/fresherWebsite"

// Require MongoDB
let mongoose = require('mongoose')
mongoose.Promise = global.Promise


// Start connection

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((e) => {
	console.log('Connected to MongoDB! 😃🔥')
}).catch((e) => {
	console.error('Failed to connect to MongoDB 😕💥 ')
})


//Created a local Mongodb data base