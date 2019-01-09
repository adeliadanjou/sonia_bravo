const axios = require("axios");

let axiosError = function(destination, body) {
  return axios.post("http://localhost:9001/messages", { destination, body });
};

///1
axiosError("", "")
  .then(resp => {
    console.log("COMO QUE THEN?! TENEMOS UNA BRECHA DE SEGURIDAD!"); //500 ERROR porque son string vacias
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500)
    // response.send('Send again')
  });
///2

axiosError("1", "")
  .then(resp => {
    console.log("DESDE CUANDO UN NUM ES UN DESTINO!"); //500 error porque es un numero en un string
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500)
    // response.send('Send again')
  });
///3
axiosError(":)", ":P")
  .then(resp => {
    console.log(
      "...Bromas fuera, por favor, desde cuando un emotiono entra en un then."
    ); //500 error porque es un numero en un string
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500)
    // response.send('Send again')
  });
////4
axiosError("@.es", "")
  .then(resp => {
    console.log("No es un correo, no te das cuenta?"); //500 error porque es una arroba en un string
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500)
    // response.send('Send again')
  });
////5
axiosError("pepe", "pepa")
  .then(resp => {
    console.log(
      "Entra al then permitiendo cualquier tipo de contenido dentro de string, el destination debe ser un mail"
    ); //500 error porque es una arroba en un string
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500)
    // response.send('Send again')
  });
////6
axiosError(
  "cabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallengecabifybootcampCabifyChallenge",
  "body"
)
  .then(resp => {
    console.log("Entra por el then y es demasiado largo"); //500 error, demasiados caracteres, limitar a 20 aprox
    // response.status(200);
    // response.send(`${resp.data}`);
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    response.status(500);
    response.send("Send again");
  });
////7
axiosError("🖖👽", "body")
  .then(resp => {
    console.log("I want to believe... But this is not a good then"); //500 error, no puede poner emojis
    // response.status(200);
    // response.send(`${resp.data}`);
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500);
    // response.send("Send again");
  });
/////8
axiosError("null", "null")
  .then(resp => {
    console.log("not null in then"); //500 error, no puede ser null
    // response.status(200);
    // response.send(`${resp.data}`);
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500);
    // response.send("Send again");
  });
/////9
  axiosError("[]", "[]")
  .then(resp => {
    console.log("NO. ES. UN. ARRAY"); //500 error, no puede ser null
    // response.status(200);
    // response.send(`${resp.data}`);
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500);
    // response.send("Send again");
  });
/////10
  axiosError("{}", "{}")
  .then(resp => {
    console.log("NO. ES. UN. OBJECT"); //500 error, no puede ser null
    // response.status(200);
    // response.send(`${resp.data}`);
  })
  .catch(e => {
    console.log("Todo correcto y bonito y precioso :)");
    // response.status(500);
    // response.send("Send again");
  });


module.exports = axiosError;