const Credit = require("../models/UserCredit");
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

              return Credit("replica").find({})
                .then(credit2 => {

                  if (credit2.length === 0) {
                   saveReplica(credit2)
                      .then(
                        console.log("Credit saved into second database. All saved!!!") 
                      )
                      .catch(err => {

                          var CreditPrimary = Credit("primary");
                          console.log("ERROR: Something went wrong saving into second database. First database credit restored!")
                          return CreditPrimary.findOneAndUpdate({
                            _id: credit[0]._id
                          }, {
                            "amount": credit[0].amount - amount
                          })
                        })
                  }
                })
                .catch(error => {
                  return error
                })
            })
            .catch(err => {
              return err
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

              var CreditReplica = Credit("replica");

              return Credit("replica").find({})
                .then(credit2 => {

                  return CreditReplica.findOneAndUpdate({
                      _id: credit2[0]._id
                    }, {
                      "amount": credit2[0].amount + amount
                    })
                    .then(credit2 => {
                      console.log("Updated second credit database. All saved!!")

                    })
                    .catch(credit2 => {
                      var CreditPrimary = Credit("primary");

                      return CreditPrimary.findOneAndUpdate({
                          _id: credit[0]._id
                        }, {
                          "amount": credit[0].amount - amount
                        })
                        .then(res.status(500).send("Error updating credit in replica. Restoring credit into first database"))
                    })
                })

            })
            .catch(credit => { //si no se guarda en primera
              console.log("Error updating credit in first database")
            })
        }
      })
  }
  else {
    console.log("One Database KO, retry later!")
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