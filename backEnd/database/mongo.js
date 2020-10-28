// Require MongoDB
let mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Start connection
// Have to add MongoAtlas later
mongoose.connect("mongodb://localhost:27017/fresherWebsite", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then((e) => {
	console.log('Connected to MongoDB! 😃🔥')
}).catch((e) => {
	console.error('Failed to connect to MongoDB 😕💥 ')
})


//Created a local Mongodb data base