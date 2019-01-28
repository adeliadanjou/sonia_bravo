const Credit = require("../models/UserCredit");

let checkCredit = function (job) {

    return Credit("primary").find({})
    .then(credit => {
      if (credit[0].amount === 0) {

        let CheckCredit = {
          type: "check credit",
          myId: job.data.myId,
          message: job.data,
          isCredit: "NO"
        }
        console.log("You have not credit")
        return CheckCredit

      } else {
        let CheckCredit = {
          type: "check credit",
          myId: job.data.myId,
          message: job.data,
          isCredit: "YES"
        }
        console.log("You have enough credit")
        return CheckCredit
        
      }
    })

    .catch(error => {
      console.log(error)
      let CheckCredit = {
        type: "check credit",
        myId: job.data.myId,
        message: job.data,
        isCredit: "ERROR CHECKING CREDIT"
      }
      console.log("error checking credit")
      return CheckCredit;
    })

}

module.exports = checkCredit;