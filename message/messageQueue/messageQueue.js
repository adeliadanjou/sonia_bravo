const Queue = require('bull');
const breaker = require('../messageApp/circuitBreaker')
const messageSave = require('../clients/messageSave')
const messageQueue = new Queue('messageQueue', 'redis://sonia_bravo_redis_1:6379');
const creditQueue = new Queue('creditQueue', 'redis://sonia_bravo_redis_1:6379');

messageQueue.process(function (job, done) {

  console.log(job.data)
  if(job.data.type === "check credit" && job.data.isCredit === "NO"){
   console.log("Not enough credit")
   done()
  }
  else if(job.data.type === "check credit" && job.data.isCredit === "YES"){

  const myId = job.data.message.myId;
  const destination = job.data.message.destination;
  const body = job.data.message.body;

  return breaker.fire(destination, body)
    .then(resp => {

      let status = "OK"

      return messageSave(myId, status)
      .then(done)
      .catch(done);

    })
    .catch(resp => {
      console.log("\n\n\n\n")
      console.log(resp.message)
      console.log("\n\n\n\n")
      if (resp.message == "Timed out") {
        let status = resp
        return messageSave(myId, status).then(done)
          .catch(done);
      } 
      
      else if(resp === "Breaker is open") {
        let status = resp
        return messageSave(myId, status).then(done)
          .catch(done);
      } 

      else {
        let status = "Error HTTP: NO ENVIADO"
        return messageSave(myId, status).then(done)
          .catch(done);
      }
    })
    
  }
  else{ console.log("ERROR").then(done)}
  

})


module.exports = {messageQueue, creditQueue}