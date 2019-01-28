const Credit = require("../models/UserCredit");
const logger = require('../logs/winston')

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
        logger.warn("You have not credit")
        return CheckCredit

      } else {
        let CheckCredit = {
          type: "check credit",
          myId: job.data.myId,
          message: job.data,
          isCredit: "YES"
        }
        logger.info("You have enough credit")
        return CheckCredit
        
      }
    })

    .catch(error => {
      
      let CheckCredit = {
        type: "check credit",
        myId: job.data.myId,
        message: job.data,
        isCredit: "ERROR CHECKING CREDIT"
      }
      logger.error("Error checking credit")
      return CheckCredit;
    })

}

module.exports = checkCredit;