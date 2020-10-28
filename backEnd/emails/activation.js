const sgMail = require("@sendgrid/mail")
const apiKey = require("./../config/dev.json").APIKEY
sgMail.setApiKey(apiKey)

const mail = (data, email) => {
    sgMail.send({
        "to": email,
        "from": "b119043@iiit-bh.ac.in",
        "subject": "Activation Mail",
        "text": `Hey!!! This is your CR. Click on this link to activate your account http://localhost:3000/activate/${data}`
    })
}


module.exports = {
    mail
}

