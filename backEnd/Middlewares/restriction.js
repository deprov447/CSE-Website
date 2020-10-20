const restriction = (req, res, next) => {
    const transferStudentId = ["b319005", "b319020", "b219032", "b519044", "b219024", "b319006", "b419035", "b419007", "b219015"] //To be updated
    //Add if any exceptions

    const reg = /b119(0[0-9][0-9])@iiit-bh.ac.in/i   //Ask whether to make case insensitive
    const reg2 = /b120(0[0-9][0-9])@iiit-bh.ac.in/i

    const rollNo = req.body.email.split("@");
    const email = req.body.email;
    const isSenior = reg.test(email)
    const isFresher = reg2.test(email)

    req.rollNo = rollNo[0]
    
    if (isSenior || transferStudentId.includes(rollNo[0].toLowerCase())) {

        req.body.isAdmin = true;
        next();
    } else if (isFresher) {
        req.body.isAdmin = false;
        next();
    } else {
        res.status(500).send("Student not from CSE 19-23 batch or 20-24 batch or not using official mail ID")
    }

}


module.exports = restriction;