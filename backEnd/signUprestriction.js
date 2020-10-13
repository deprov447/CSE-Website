const restriction = (userEmail) => {
    const transferStudentId = ["b319005", "b319020", "b219032", "b519044", "b219024", "b319006", "b419035", "b419007", "b219015"] //To be updated
    const reg = /b119/i
    const reg2 = /b120/i

    const rollNo = userEmail.split("@");
    const isMatch = reg.test(rollNo[0])
    if (!isMatch) {

        if (!transferStudentId.includes(rollNo[0].toLowerCase())) {
            throw new Error("Not from CSE 19-23 batch")
        }
    }
    return true;
}


module.exports = restriction;