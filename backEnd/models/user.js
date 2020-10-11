// import mogoose
let mongoose = require('mongoose')

// import promise
mongoose.Promise = global.Promise

// create a Schema
let Users = new mongoose.Schema({
	
	// Here we can add a particular user by allowing them to sign in or sign UP
	
	
// 	email: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   passwordConf: {
//     type: String,
//     required: true,
//   }
})

module.exports = mongoose.model('Users', Users)
