const axios = require("axios");

// let axiosError = function (destination, body) {
//   return axios.post("http://localhost:9001/messages", {
//     destination,
//     body
//   });
// };

///1

axiosError("", "")
  .then(resp => {
    console.log("Destination & Body cannot be empties");
  })
  .catch(e => {
    console.log("OK");

  });
///2

axiosError(1, 2)
  .then(resp => {
    console.log("Destination & Body must be strings");
  })
  .catch(e => {
    console.log("OK");

  });


axiosError("b@.es", "bla")
  .then(resp => {
    console.log("OK");
  })
  .catch(e => {
    console.log("Destination should be an email");
  });

////5
axiosError("pepe", "pepa")
  .then(resp => {
    console.log(
      "Destination should be an email"
    );
  })
  .catch(e => {
    console.log("OK");
  });

////6
axiosError(
    "cabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallenge",
    "body"
  )
  .then(resp => {
    console.log("Too long!!!"); 
  })
  .catch(e => {
    console.log("OK");
  });

////7
axiosError("🖖👽", "body")
  .then(resp => {
    console.log("Destination is an email, not emojis allowed"); 
  })
  .catch(e => {
    console.log("OK");
  });

/////8
axiosError("null", "null")
  .then(resp => {
    console.log("Destination & Body should be strings"); 
  })
  .catch(e => {
    console.log("OK");

  });
/////9
axiosError("[]", "[]")
  .then(resp => {
    console.log("Destination & Body should be strings, not arrays allowed"); //500 error, no puede ser null
  })
  .catch(e => {
    console.log("OK");
  });

/////10
axiosError("{}", "{}")
  .then(resp => {
    console.log("Destination & Body should be strings, not objects allowed"); //500 error, no puede ser null
  })
  .catch(e => {
    console.log("OK");
  });


module.exports = axiosError;