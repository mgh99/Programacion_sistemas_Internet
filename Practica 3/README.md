--------------------------------------------------------------
## PRACTICA 3
-----------------------------------------------------------------
Se desea realizar una API para la reserva de puestos de trabajo en un espacio de
coworking. El espacio de coworking tiene 20 puestos, numerados del 1 al 20. Los puestos
sólo se pueden reservar por usuarios registrados en la aplicación

La información de las reservas se debe almacenar en una base de datos MongoDB alojada
en Mongo Atlas.

El alumno es libre de organizar los datos en la DDBB como considere oportuno
Los endpoints que debe ofrecer la API son los siguientes:

### GET /status

Indica que el servidor está OK y listo para recibir peticiones.

Response

Status: 200

Body: Devuelve la fecha del día en formato dd-mm-aaaa

### POST /signin

Request

Se debe pasar como body (investigar en internet cómo se hace) el email y la contraseña

Si el resgistro es OK (no existe un usuario ya registrado con el mismo email)

Response

Status: 200

Si no se puede realizar el registro (existe ya un usuario)

Response

Status: 409

### POST /login (1 punto)

Request

Se debe pasar como body (investigar en internet cómo se hace) el email y la contraseña

Si el login es OK

Response

Status: 200

Body: Un token de sesión, que se utilizará para las acciones que requieren estar
loggeado.

Todas las acciones que requieran estar loggeado deben recibir el token en los headers.

Si no se puede realizar el login

Response

Status: 401

### POST /logout (1 punto)

Requiere estar loggeado.

Si el logout es OK

Response

Status: 200

(el token ya no debe ser válido)

Si hay algún error

Response

Status: 500

### GET /freeseats (1 puntos)

Requiere estar loggeado.

Request

Se debe pasar como parámetros el día, mes y año (debe ser el día actual o un día futuro).

Todo OK:

Response

Status: 200

Body: Un JSON con un array con los números de los puestos disponibles ese día mes y
año.

Si el día mes y año introducidos no son válidos, por ejemplo el mes es 34

Response

Status: 500

### POST /book (1 punto)

Requiere estar loggeado.

Request

Se debe pasar como parámetro el día, mes y año y el número del puesto que se desea
reservar (fecha de hoy o futura)

Si el sitio está disponible en esa fecha devuelve:

Response

Status: 200

Body: Un JSON con el número de asiento y la fecha en la que se ha reservado
(confirmación de reserva)

Si el sitio no está disponible

Response

Status: 404

Si la fecha es inválida o ya ha pasado, o el número de puesto no es válido

Response

Status:500

### POST /free (3 puntos)

Requiere estar loggeado.

Request

Se debe pasar como body el día, mes y año. Libera el puesto si lo he reservado yo

Si el sitio estaba reservado y lo he reservado yo:

Response

Status: 200

Si no había ningún sitio reservado ese día con mi usuario

Response

Status: 404

Si la fecha es inválida

Response

Status: 500

### GET /mybookings (3 puntos)

Requiere estar loggeado.

Response

Status: 200

Body: Un array con todas mis reservas futuras (desde la fecha en la que se hace la
petición)

Si no había ningún sitio reservado en el futuro con mi usuario

Response

Status: 404
