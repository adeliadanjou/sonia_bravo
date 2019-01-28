const Credit = require("../models/UserCredit");
const logger = require('../logs/winston')

let pay = function () {

  return Credit("primary").find({})
    .then(credit => {

      if (credit[0].amount > 100) {
        var CreditPrimary = Credit("primary");

        CreditPrimary.findOneAndUpdate({
            _id: credit[0]._id
          }, {
            "amount": credit[0].amount - 100
          })
          .then(credit => {
            logger.info("Payed Primary!")

            Credit("replica").find({})
              .then(credit2 => {

                var CreditReplica = Credit("replica");

                return CreditReplica.findOneAndUpdate({
                    _id: credit2[0]._id
                  }, {
                    "amount": credit2[0].amount - 100
                  })
                  .then(credit2 => {
                    logger.info("Payed Replica!")
                  })
                  .catch(credit2 => {
                    logger.error("Error paying on Replica!")

                    var CreditPrimary = Credit("primary");
                    return CreditPrimary.findOneAndUpdate({
                      _id: credit2[0]._id
                    }, {
                      "amount": credit2[0].amount + 100
                    })
                  })

              })
              .catch(credit => {
                logger.error("Didn't find any credit account on Replica!")
              })
         
          })
          .catch(credit => {
            logger.error("Error paying!")
          })
      } else {
        logger.warn("No hay crédito suficiente")
      }
    })
    .catch(credit => {
      logger.error("Didn't find any credit account!")

    })
}


module.exports = pay;