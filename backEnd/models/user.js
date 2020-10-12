// import mogoose
let mongoose = require('mongoose')

//Importing module for hashing
const bcrypt = require("bcryptjs")

//Importing module for generating token
const jwt = require("jsonwebtoken")

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
userSchema.statics.verifyUser = async (email, password) => {
	const user = await userModel.findOne({ email })

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
	const token = jwt.sign({ _id: user._id.toString() }, "key")
	this.tokens.push({ token })
	await this.save();
	return token;
}


userModel = mongoose.model('Users', userSchema)

module.exports = {
	userSchema, userModel
}
