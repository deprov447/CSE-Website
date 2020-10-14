const restriction = (req, res, next) => {
    const transferStudentId = ["b319005", "b319020", "b219032", "b519044", "b219024", "b319006", "b419035", "b419007", "b219015"] //To be updated
    //Add if any exceptions

    const reg = /b119/i
    const reg2 = /b120/i

    const rollNo = req.body.email.split("@");
    const isSenior = reg.test(rollNo[0])
    const isFresher = reg2.test(rollNo[0])

    req.rollNo = rollNo[0]
    
    if (isSenior || transferStudentId.includes(rollNo[0].toLowerCase())) {

        req.body.isAdmin = true;
        next();
    } else if (isFresher) {
        req.body.isAdmin = false;
        next();
    } else {
        res.status(500).send("Student not from CSE 19-23 batch or 20-24 batch")
    }

}


module.exports = restriction;