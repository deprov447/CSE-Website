// import mogoose
let mongoose = require('mongoose')

//Importing module for hashing
const bcrypt = require("bcryptjs")

//Importing module for generating token
const jwt = require("jsonwebtoken")
const TOKEN_KEY = require("../config/dev.json").TOKEN_KEY
// import promise
mongoose.Promise = global.Promise

// create a Schema
let userSchema = new mongoose.Schema({

	// Here we can add a particular user by allowing them to sign in or sign UP


	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	//   passwordConf: {
	//     type: String,
	//     required: true,
	//   }
	tokens: [{
		token: {
			type: String
		}
	}],
	isactivate: {
		activate: {
			type: Boolean,
			default: false
		},
		hashedToken: {
			type: String
		}

	},
	isAdmin: {
		type: Boolean
	},
	detailsId: [{
		type: mongoose.Schema.Types.ObjectId
	}]
})

//Hashing the password before saving in dataBase
userSchema.pre("save", async function (next) {

	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8)

	}
	next();
})

// Log in verification
userSchema.statics.verifyUser = async (email, password, admin) => {
	let user;

	if (admin) {
		user = await seniorUserModel.findOne({
			email
		})
	} else {
		user = await fresherUserModel.findOne({
			email
		})
	}

	if (!user) {
		throw new Error("Wrong email or password")
	}

	const matchPass = await bcrypt.compare(password, user.password)

	if (!matchPass) {
		throw new Error("Wrong email or password")
	}
	return user;
}

//Generating authentication token
userSchema.methods.authToken = async function (user) {
	const token = jwt.sign({ _id: user._id.toString(), isAdmin: user.isAdmin }, TOKEN_KEY)
	this.tokens.push({ token })
	await this.save();
	return token;
}

userSchema.methods.addEncodedValue = async function (token) {
	this.isactivate.hashedToken = token;
	this.save();
}

seniorUserModel = mongoose.model('19-23_Batch', userSchema)
fresherUserModel = mongoose.model('20-24_Batch', userSchema)

module.exports = {
	userSchema,
	seniorUserModel,
	fresherUserModel
}
