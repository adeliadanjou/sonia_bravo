const Credit = require("../models/UserCredit");

const {messageQueue} = require('../creditQueue/creditQueue')
let creditValidation = function (req, res, next) {


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
        return messageQueue.add(CheckCredit)

      } else {

        let CheckCredit = {
          type: "check credit",
          myId: job.data.myId,
          message: job.data,
          isCredit: "YES"
        }
        console.log("you have enough credit")
        return messageQueue.add(CheckCredit)

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
      return messageQueue.add(CheckCredit)
    })

}

module.exports = creditValidation;