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
  
    if (isReplicaOn){  //SI LAS DOS CONECTADAS
    
      return Credit("primary").find({}) // PRIMERA VACIA
      .then(credit => {
      if(credit.length === 0){
  
        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});
        
      return myCredit.save() //PRIMERA LA LLENO
      .then(credit => {
         console.log("primera guardada");
         
         ///////
        return Credit("replica").find({}) 
         .then(credit2 => {
          
         if(credit2.length === 0){ // SEGUNDA VACIA
     
           var CreditReplica = Credit("replica");
           var myCredit2 = new CreditReplica({amount});
           
     
         return myCredit2.save() // SEGUNDA LA LLENO
         .then(
           console.log("TODO GUARDADO!") //GUARDADAS UNA Y DOS
         )
         .catch(credit2 => {

          var CreditPrimary = Credit("primary");
        
          console.log("Error GUARDANDO LA SEGUNDA, borrada la primera")
          return CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - amount })
         }
    
         )} 
       })
       .catch(error => {
         console.log("No se ha encontrado base de datos replica")
       })
     

      })
      .catch(credit => {
        console.log("Error adding credit to first database")
      })
  
      }  // A PARTIR DE AQUI NO ESTA VACIO:
      
      else {   // BUSCO Y ACTUALIZO LAS DOS:
   
        var CreditPrimary = Credit("primary");
        var myCredit = new CreditPrimary({amount});

        return CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount + amount })
        .then(credit => {
  
          console.log("actualizo la primera")
           var CreditReplica = Credit("replica");

        return Credit("replica").find({}) 
      .then(credit2 => {
        
        return CreditReplica.findOneAndUpdate({_id: credit2[0]._id}, { "amount" : credit2[0].amount + amount })
        .then(credit2 => {
          console.log("actualizada replica")
          
        })
        .catch(credit2 => {
          var CreditPrimary = Credit("primary");
     
           return CreditPrimary.findOneAndUpdate({_id: credit[0]._id}, { "amount" : credit[0].amount - amount })
          .then( res.status(500).send("Error updating credit in replica. deleting amount in first database"))
        })
      })

        })
        .catch(credit => { //si no se guarda en primera
          console.log("Error updating credit in first database")
        })

      }
    })
    .catch(error => {
      console.log(error)
    })
 
    } ///replicaON false --- solo una base de datos    ESTO NO SE TOCA!!!!!!

    else {
    console.log("One Database KO, retry later!")
    }
  }
  
}


module.exports = creditSave;