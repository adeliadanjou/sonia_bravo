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
Esta App cuenta con dos endpoints: 


/ - RUTA GET: (en index.js)
En esta petición simplemente mandamos por puerto 9001 un "Hola, mundo"

/messages - RUTA POST: (en postMessage.js)
En esta petición mandamos por puerto 9001 a un servicio externo de mensajes que corre en el puerto 3000: 
(axios.post('http://sonia_bravo_messageapp_1:3000/message) un body json de este tipo:

{
  "destination": "STRING",  <---- esto es un email
  "body": "STRING"
}

Antes de mandar los datos nos aseguramos de que sean correctos con condicionales, (para mandar la petición
solo en caso de haber pasado los tests correspondientes y ahorrarnos la petición si no procede hacerla).

TESTS --> que body y destination sean strings, que el destination sea un email,
que tanto body como destination no superen los 30 caracteres y que no estén vacíos.

En caso de que todo esto se cumpla, se hace la petición post a través de /messages al servicio externo.
En caso contrario, nos ahorramos de esta manera hacer la petición.

Si hubiera otros errores no recogidos en los condicionales la petición se realizaría y entraría por el catch,
mandando un 500 y un "send again".

Para finalizar, nuestra petición axios ha sido aislada en una función (messageApp.js) para que en caso de necesitar cambiar el servicio externo algún día, solo tengamos que ir a este punto, algo sumamente conveniente. 
