// import mogoose
let mongoose = require('mongoose')

// import promise
mongoose.Promise = global.Promise

// create a Schema
let detailSchema = new mongoose.Schema({
	Roll:{
		type:String
	},
	image:{
		type:String,
	},
	name: {
		type: String,
		// trim: true,
		// required: "field can not be empty"
	},
	hobbies: {
		type: String,
	},
	link: {
		insta: {
			type: String,
		}
	}
})

detailsModel =  mongoose.model('2020-24_Batch_details', detailSchema)
module.exports = detailsModel;