const sgMail = require("@sendgrid/mail")
const apiKey = require("./../config/dev.json").APIKEY
sgMail.setApiKey(apiKey)


const mail = (data, email) => {
    const text= `http://localhost:3000/activate/${data}`
    sgMail.send({
        "to": email,
        "from": {
                    email:"b119043@iiit-bh.ac.in",
                    name :"Ravidas Vishal"
                },
        "subject": "CSE Website Authentication",
        "html":`<h2>Hello Fresher</h2>
                <b>Click on this <a href=${text}>Link</a> to verify your email</b><br>
                If there is a problem, just reply with subject "Fresher Verification Issue" and describe your problem.<br>
                <b>DON'T SPAM (HAZARDIOUS)</b><br><br>
                Regards<br>
                Ravidas Vishal<br>
                Class Representative<br>
                CSE 2019-23`
    })
}


module.exports = {
    mail
}

