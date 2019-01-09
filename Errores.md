- Permite alterar los "Keys".
- En "Destination", dentro de strings permite números cuando realmente debe tener una información concreta sobre destino.
- En "Destination", dentro de strings permite caracteres especiales cuando realmente debe tener una información concreta sobre destino.
- El código actualmente es capaz de aceptar grandes cantidades de código, tarda mucho hasta que el payload peta, lo cual debería poder limitarse a un número de caracteres, evitando también números, caracteres especiales, números.
- Permite tener campos vacíos, lo cual permite engañar de una manera sencilla y es un error que debe estar controlado permitiendo información específica.
- Permite introducir mas keys de los que realmente se piden, lo cual habia de alguna manera que poder limitarlo. No puede ser que se ponga el key "Pepe" y me de un 200 OK.
- Cuando pones un key sin comillas, revienta.
- Permite emoticonos, lo cual no se debe permitir.
- Pone que tiene que ser un string, pero permite números y números dentro de strings. Eso hay que controlarlo. 

