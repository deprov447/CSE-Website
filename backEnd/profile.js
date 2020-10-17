const { Error } = require("mongoose")
const multer = require("multer")

const uploadProfilePic = multer({
    limits: {
        fileSize: 1000000,
    },
    filterUploads(req, file, cb) {
        if (!file.originalname.match(/\.jpe?g$/)) {
            return cb(new Error("Please upload a jpg or jpeg file"))
        }
        cb(undefined, true)
    }

})

module.exports = uploadProfilePic