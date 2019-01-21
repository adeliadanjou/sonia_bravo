const axios = require("axios");

let axiosError = function (destination, body) {
  return axios.post("http://localhost:9001/messages", {
    destination,
    body
  });
};

///1

axiosError("", "")
  .then(resp => {
    console.log("Destination & Body cannot be empties"); //500 ERROR porque son string vacias
  })
  .catch(e => {
    console.log("OK");

  });
///2

axiosError(1, 2)
  .then(resp => {
    console.log("Destination & Body must be strings"); //500 error porque es un numero en un string
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
    console.log("Too long!!!"); //500 error, demasiados caracteres, limitar a 20 aprox;
  })
  .catch(e => {
    console.log("OK");
  });

////7
axiosError("🖖👽", "body")
  .then(resp => {
    console.log("Destination is an email, not emojis allowed"); //500 error, no puede poner emojis
  })
  .catch(e => {
    console.log("OK");
  });

/////8
axiosError("null", "null")
  .then(resp => {
    console.log("Destination & Body should be strings"); //500 error, no puede ser null
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