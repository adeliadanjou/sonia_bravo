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
          
         if(credit.length === 0){ // SEGUNDA VACIA
     
           var CreditReplica = Credit("replica");
           var myCredit = new CreditReplica({amount});
           
     
         myCredit.save() // SEGUNDA LA LLENO
         .then(credit => {
          
           res.status(200).send("TODO GUARDADO!") //GUARDADAS UNA Y DOS
   
         })
         .catch(credit => {
           res.status(500).send("Error GUARDANDO LA SEGUNDA, hay que borrar la primera")
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
   
        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});

        CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
        .then(credit => {
  
          console.log("actualizo la primera")

          var CreditReplica = Credit("replica");

          Credit("replica").find({}) 
        .then(credit => {
          CreditReplica.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
          .then(credit => {
  
            res.send("actualizada replica")
            
          })
          .catch(credit => {
            res.status(500).send("Error updating credit")
          })
         
        })

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
    res.send("One Database KO, retry later!")
    }
  }
  
}


module.exports = creditSave;