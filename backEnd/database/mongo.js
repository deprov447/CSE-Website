// Require MongoDB
let mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Start connection
mongoose.connect("mongodb://127.0.0.1/freshersWebsite", { useNewUrlParser: true, useUnifiedTopology: true }).then((e) => {
	console.log('Connected to MongoDB! 😃🔥')
}).catch((e) => {
	console.error('Failed to connect to MongoDB 😕💥 ')
})


//Created a local Mongodb data base