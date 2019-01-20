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
         console.log("primera guardada");
         
         ///////
        Credit("replica").find({}) 
         .then(credit2 => {
          
         if(credit2.length === 0){ // SEGUNDA VACIA
     
           var CreditReplica = Credit("replica");
           var myCredit2 = new CreditReplica({amount});
           
     
         myCredit2.save() // SEGUNDA LA LLENO
         .then(
           res.status(200).send("TODO GUARDADO!") //GUARDADAS UNA Y DOS
         )
         .catch(credit2 => {

          var CreditPrimary = Credit("primary");
          var myCredit = new CreditPrimary({amount});

          CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - amount })

           res.status(500).send("Error GUARDANDO LA SEGUNDA, borrada la primera")

         }
    
         )} 
       })
       .catch(error => {
         console.log("no se ha encontrado base de datos replica")
       })
     

      })
      .catch(credit => {
        res.status(500).send("Error adding credit to first database")
      })
  
      }  // A PARTIR DE AQUI NO ESTA VACIO:
      
      else {   // BUSCO Y ACTUALIZO LAS DOS:
   
        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});

        CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
        .then(credit => {
  
          console.log("actualizo la primera")

              var CreditReplica = Credit("replica");

        Credit("replica").find({}) 
      .then(credit2 => {
        
        CreditReplica.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount + amount })
        .then(credit2 => {

          res.send("actualizada replica")
          
        })
        .catch(credit2 => {
          var CreditPrimary = Credit("primary");
          var myCredit = new CreditPrimary({amount});

          CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - amount })
          .then( res.status(500).send("Error updating credit in replica. deleting amount in first database"))
   
        })
       
      })

        })
        .catch(credit => { //si no se guarda en primera
         
          res.status(500).send("Error updating credit in first database")
        })

    
      }
    })
    .catch(error => {
      console.log(error)
    })

 
    } ///replicaON false --- solo una base de datos    ESTO NO SE TOCA!!!!!!

    else {
    res.send("One Database KO, retry later!")
    }
  }
  
}


module.exports = creditSave;