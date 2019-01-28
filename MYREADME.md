- Permite alterar los "Keys".
- En "Destination", dentro de strings permite números cuando realmente debe tener una información concreta sobre destino.
- En "Destination", dentro de strings permite caracteres especiales cuando realmente debe tener una información concreta sobre destino.
- El código actualmente es capaz de aceptar grandes cantidades de código, tarda mucho hasta que el payload peta, lo cual debería poder limitarse a un número de caracteres, evitando también números, caracteres especiales, números.
- Permite tener campos vacíos, lo cual permite engañar de una manera sencilla y es un error que debe estar controlado permitiendo información específica.
- Permite introducir mas keys de los que realmente se piden, lo cual habia de alguna manera que poder limitarlo. No puede ser que se ponga el key "Pepe" y me de un 200 OK.
- Cuando pones un key sin comillas, revienta.
- Permite emoticonos, lo cual no se debe permitir.
- Pone que tiene que ser un string, pero permite números y números dentro de strings. Eso hay que controlarlo. 

--------------------->
This App has two endpoints: 


/ -  GET ROUTE: ( index.js)

Here we just say "Hola, mundo" using the port 9001


/messages - POST ROUTE: (postMessage.js)

Here, using port 9001 we send a body json the info to an external service on port 3000
(axios.post('http://sonia_bravo_messageapp_1:3000/message) 

This Body.json looks like:

{
  "destination": "STRING",  <---- an email
  "body": "STRING"
}

So before send data we must ensure the data is right with some ifs, (this way we just call the axios if we must and all these conditions has passed before).

TESTS --->
1) body & destinations should be strings
2) destination must be an email
3) body &/or destination should be less than 30 characters long.
4) body &/or destination should not be empty

Just in case all these things are true, then the axios call will execute and POST route will be done
(/messages) 

If others errors occurs, the axios call will be executed but with the .catch way giving an 500 error and a
"send again" will be sent 

To conclude, inside messageApp.js we isolate into a function our axios call, this way, if in a future we want to change the external service is easy & convenient to find just the axios call into a file.

EXERCISE 3 ------------------>

Docker-compose.yml ---> added a new container for mongo. We will need mongo to work with our container exercise, (client) so a depends_on was added to tell docker to wait the up of exercise until mongo is up.

App.js ---> We make the connection to mongo here, using mongoose.connect. The setTimeOut is made because
mongo takes so long to being up. So we are just saying mongo "take your time bro, I'll wait".
We can also use a setInterval or a for loop here.  

models/Message.js ---> Here we have created a message model to save into mongo data, adding three posible values into status: OK, NO ENVIADO o TIMEOUT.

messageSave.js ---> function to save into mongo the message.

routes/getMessages.js ----> once we have save messages, we want them all. So here is a get to get the full list.

messageApp.js ---> Here we implement in the axios call a timeout (3 seconds)

postMessages.js ----> inside then and catch of the axios call, we save the data. 

   - If then --> everything was okay, so status will be OK!
  -  If catch ---> two options
            1) If "e" is undefined --> Timeout ---> status: timeout saved into databse
            2) If status 500, Not sent ---> status: no enviado, saved into database


Finally if we see database, we will see the three status according to the axios call and the response.


QUESTIONS:

¿Qué pasa si se envía si la base de datos da un error?
 - Se guarda en la base de datos pero queda como NO ENVIADO. Deberíamos usar idempotencia para reintentarlo
 - hasta que se guarde apropiadamente. Una de las formas es estableciendo un setTimeOut hasta que la petición sea exitosa.
 ¿Es igual de importante el error en el envío de un mensaje o en la consulta del registro? 
 Pensar cómo gestionar los errores en cada caso para garantizar la consistencia en los datos de acuerdo al contrato del registro.
 - Depende de la app que estemos hablando. Todo es importante y todos estos errores de envío deberían de manejarse para que se intentasen hasta que no fallasen. Para mí es igualmente importante que si tengo una app y falla una búsqueda en la base de datos de un cliente y este tiene que intentarlo varias veces se va a molestar de que no funcione. También si está enviando un mensaje en un email y no llega molestará. 


EXERCISE 4:

models/Message.js --> created UserCredit model in order to have credit balance

clients/creditSave.js --> created creditSave to recharge credit. We also lock the operation in order to protect it. 

routes/postMessages.js --> updated. Here we call our post /messages to make messages but first we 
call checkCredit in order to see if we have credit to post. 

validations/checkCredit.js --> Here we see if we have credit to post messages or not.
 If we haven't, a message appear telling you "No cash, No messages", If we have, then we call function validation.js:

validations/checkCredit.js --> Now we have credit, we see if the message we sent have the proper body. If everything is OK and we send the message, then we call pay function, which substrate credit if the message is send with a status 200 and we also lock the operation in order to protect it.

clients/pay.js --> created pay to substract credit when we send messages








