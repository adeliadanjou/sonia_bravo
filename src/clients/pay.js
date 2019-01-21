const Credit = require("../models/UserCredit");

let pay = function() {
  
   return Credit("primary").find({})
  .then(credit => {
    
    if (credit[0].amount > 100){
      var CreditPrimary = Credit("primary");
     
      CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - 100 })
      .then(credit => {
        console.log("Payed Primary!")

        Credit("replica").find({})
        .then(credit2 => {
           
          
            var CreditReplica = Credit("replica");
           
            return CreditReplica.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount - 100 })
            .then(credit2 => {
              console.log("Payed Replica!")
            })
            .catch(credit2 => {
              console.log("Error paying on Replica! Retry again")

            var CreditPrimary = Credit("primary");
             return CreditPrimary.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount + 100 })
            })
      
        })
        .catch(credit => {
          console.log("Didn't find any credit account on Replica!")
               
        })
        ////////////
      })
      .catch(credit => {
        console.log("Error paying!")
      })
    } else {console.log("no hay crédito suficiente")}
  })
  .catch(credit => {
    console.log("Didn't find any credit account!")

  })
}


module.exports = pay;