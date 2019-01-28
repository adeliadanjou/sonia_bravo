const Credit = require("../models/UserCredit");
const logger = require('../logs/winston')
const {
  isReplicaOn
} = require("../database");


let creditSave = function (amount, res) {

  if (isReplicaOn) {

    return Credit("primary").find({})
      .then(credit => {
        if (credit.length === 0) {
          savePrimary(credit)

            .then(credit => {
              logger.info("Credit saved in primary database")
              return Credit("replica").find({})
                .then(credit2 => {

                  if (credit2.length === 0) {
                   saveReplica(credit2)
                      .then(
                       logger.info("Credit saved into second database. All saved!!!") 
                      )
                      .catch(err => {

                          var CreditPrimary = Credit("primary");
                          logger.error(err)
                          return CreditPrimary.findOneAndUpdate({
                            _id: credit[0]._id
                          }, {
                            "amount": credit[0].amount - amount
                          })
                        })
                  }
                })
                .catch(error => {
                  return logger.error(error)
                })
            })
            .catch(err => {
              return logger.error(err)
            }) } 
        else { 

          var CreditPrimary = Credit("primary");
          var myCredit = new CreditPrimary({amount});

          return CreditPrimary.findOneAndUpdate({
              _id: credit[0]._id
            }, {
              "amount": credit[0].amount + amount
            })
            .then(credit => {
              logger.info("Credit Primary Updated!")
              var CreditReplica = Credit("replica");

              return Credit("replica").find({})
                .then(credit2 => {
                  
                  return CreditReplica.findOneAndUpdate({
                      _id: credit2[0]._id
                    }, {
                      "amount": credit2[0].amount + amount
                    })
                    .then(credit2 => {
                      logger.info("Updated second credit database. All saved!!")

                    })
                    .catch(err2 => {
                      logger.error(err2)
                      var CreditPrimary = Credit("primary");

                      return CreditPrimary.findOneAndUpdate({
                          _id: credit[0]._id
                        }, {
                          "amount": credit[0].amount - amount
                        })
                        .then(logger.info("Error updating credit in replica. Restoring credit into first database"))
                    })
                })

            })
            .catch(credit => { //si no se guarda en primera
              logger.error("Error updating credit in first database")
            })
        }
      })
  }
  else {
    logger.warn("One Database KO, retry later!")
  }
}



let savePrimary = function () {
  var CreditPrimary = Credit("primary");
  var myCredit = new CreditPrimary({
    amount
  });

  return myCredit.save()
}

let saveReplica = function () {
  var CreditPrimary = Credit("replica");
  var myCredit2 = new CreditReplica({
    amount
  });

  return myCredit2.save()
}


module.exports = creditSave;