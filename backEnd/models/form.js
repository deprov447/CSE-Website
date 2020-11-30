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
		default: 'https://tse2.mm.bing.net/th?id=OIP.dRQWHlriomhRda5YshSCkgAAAA&pid=Api&P=0&w=300&h=300'
	},
	name: {
		type: String,
		// trim: true,
		// required: "field can not be empty"
	},
	links: {
		instagram: {
			type: String,
			default: ''
		},
		linkedin: {
			type: String,
			default: ''
		},
		facebook: {
			type: String,
			default: ''
		},
		github: {
			type: String,
			default: ''
		},
		twitter: {
			type: String,
			default: ''
		}
	}
})

detailsModel =  mongoose.model('2020-24_Batch_details', detailSchema)
module.exports = detailsModel;