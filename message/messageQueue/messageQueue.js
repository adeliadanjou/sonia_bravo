const Queue = require('bull');
const messageApp = require('../messageApp/messageApp')
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

  return messageApp(myId, destination, body)
    .then(resp => {

      let status = "OK"
    
      return messageSave(myId, status)
      .then(done)
      .catch(done);

    })
    .catch(resp => {

      if (resp.status === undefined) {
        let status = "TIMEOUT"
        return messageSave(myId, status).then(done)
          .catch(done);


      } else {
        let status = "NO ENVIADO"
        return messageSave(myId, status).then(done)
          .catch(done);

      }
    })
    
  }
  else{ console.log("ERROR")}
  console.log("An error ocurred finding credit")
  done()

})


module.exports = {messageQueue, creditQueue}