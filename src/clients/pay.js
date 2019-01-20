const Credit = require("../models/UserCredit");

let pay = function() {
  
   Credit("primary").find({})
  .then(credit => {
      console.log(credit[0].amount)
    
      var CreditPrimary = Credit("primary");
     
      CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - 100 })
      .then(credit => {
        console.log("Payed Primary!")

        Credit("replica").find({})
        .then(credit2 => {
            console.log(credit2[0].amount)
          
            var CreditReplica = Credit("replica");
           
            CreditReplica.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount - 100 })
            .then(credit2 => {
              console.log("Payed Replica!")
            })
            .catch(credit2 => {
              console.log("Error paying on Replica!")
             
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

  })
  .catch(credit => {
    console.log("Didn't find any credit account!")

    
  })

}


module.exports = pay;