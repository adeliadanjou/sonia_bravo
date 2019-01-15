const Credit = require("../models/UserCredit");
const {isReplicaOn} = require("../database");

let creditSave = function(amount,res) {
   
  if (typeof amount !== "number") {
    res.status(400);
    res.send("Just numbers allowed");

  } else if (amount === "") {
    res.status(400);
    res.send("amount cannot be empty");
  }
  else {
    // mutex.lock(function () {
    //   mutex.unlock();
    //   });
    if (isReplicaOn){  //SI LAS DOS CONECTADAS
    
      return Credit("primary").find({}) // PRIMERA VACIA
      .then(credit => {
      if(credit.length === 0){
  
        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});
        
      myCredit.save() //PRIMERA LA LLENO
      .then(credit => {
         console.log("primeraguardada");
         
         ///////
         return Credit("replica").find({}) 
         .then(credit => {
           console.log("entra")
         if(credit.length === 0){ // SEGUNDA VACIA
     
           var CreditReplica = Credit("replica");
           var myCredit = new CreditReplica({amount});
           
     
         myCredit.save() // SEGUNDA LA LLENO
         .then(credit => {
          
           res.status(200).send("TODO GUARDADO!") //GUARDADAS UNA Y DOS
   
         })
         .catch(credit => {
           res.status(500).send("Error GUARDANDO LA SEGUNDA")
         })
     
         } // SEGUNDA LLENA Y PRIMERA VACIA
         
         else {
         
          var CreditReplica = Credit("replica");
          var myCredit = new CreditReplica({amount});

          CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
          .then(credit => {
    
            res.status(200).send("la primera vacia estaba vacia, la segunda llena y ahora actualizadas!")
          })
          .catch(credit => {
            res.status(500).send("Error updating credit")
          })
         
     
         }
       })
       .catch(error => {
         console.log(error)
       })

     

      })
      .catch(credit => {
        res.status(500).send("Error adding credit")
      })
  
      }  // A PARTIR DE AQUI NO ESTA VACIO:
      
      else {   // BUSCO Y ACTUALIZO LAS DOS:
        var CreditReplica = Credit("replica");
        var myCredit = new CreditReplica({amount});

        CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
        .then(credit => {
  
          console.log("actualizo la replica")
        })
        .catch(credit => {
          res.status(500).send("Error updating credit")
        })


        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});

        CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
        .then(credit => {
  
          console.log("actualizo la primera")
        })
        .catch(credit => {
          res.status(500).send("Error updating credit")
        })
       
  
      }
    })
    .catch(error => {
      console.log(error)
    })

 
    } ///replicaON false --- solo una base de datos    ESTO NO SE TOCA!!!!!!

    else {
      return Credit("primary").find({})
      .then(credit => {
      if(credit.length === 0){
  
        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});
        
  
      myCredit.save()
      .then(credit => {
  
        res.status(200).send("Your first credit added!!")
      })
      .catch(credit => {
        res.status(500).send("Error adding credit. No cash no party")
      })
  
      } 
      
      else {
      
        Credit("primary").findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
        .then(credit => {
  
          res.status(200).send("Credit updated ajá!")
        })
        .catch(credit => {
          res.status(500).send("Error updating credit ajá")
        })
  
      }
    })
    .catch(error => {
      console.log(error)
    })
    }
  }
  
}


module.exports = creditSave;