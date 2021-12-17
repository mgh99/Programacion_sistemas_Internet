# PRÁCTICAS 4 Y 5
Cogemos de ejemplo para crear nuestra base de datos de mongodb, el siguiente enlace: 
https://github.com/Nebrija-Programacion/web-backend/tree/master/example/rickmorty2mongo

Se nos pide realizar en nuestra práctica el siguiente enunciado: 
https://github.com/Nebrija-Programacion/web-backend/tree/master/practicas/2122/practicaIV

Debemos de utilizar una API REST utilizando `Node.js con Typescript' y el servidor de *Apollo Server*. Y la base de datos utilizada 
para alojar nuestros datos es *Mongo Atlas*.

## Ejecución  :magic_wand:
Las dependencias correspondientes estarán instaladas dentro del package.json, ejecutando por el comando:

npm install

Se instalaran de esta forma todas las dependencias dentro de nuestro proyecto.

### Dependencias utilizadas :bookmark_tabs:

"dependencies": {
    "@types/axios": "^0.14.0",
    "@types/express": "^4.17.13",
    "@types/node": "^16.11.14",
    "apollo-server": "^3.5.0",
    "axios": "^0.24.0",
    "bcrypt": "^5.0.1",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "graphql": "^15.8.0",
    "mongodb": "^4.2.2",
    "mongoose": "^6.1.2",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.15",
    "ts-node": "^10.4.0",
    "typescript": "^4.5.4",
    "uuid": "^8.3.2",
    "uuidv4": "^6.2.12"
  },


### Datos confidenciales con .env :lock:
Hemos utilizazo el archivo .env creado en nuestra carpeta raíz, para declarar variables confidenciales como la URL de mongo, 
la cual guarda nuestros usuarios y contraseñas, el puerto de nuestro localhost y los authors.

## Participantes ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/santiago-molpeceres-d%C3%ADaz-ab9087211/"><img src="https://avatars.githubusercontent.com/u/54994511?v=4" width="100px;" alt=""/><br /><sub><b>Santiago Molpeceres</b></sub></a><br /><a href="https://github.com/smolpeceresd/Programacion_Internet" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/mar%C3%ADa-gonz%C3%A1lez-herrero-56bb21177/"><img src="https://avatars.githubusercontent.com/u/43043718?v=4" width="100px;" alt=""/><br /><sub><b>María González</b></sub></a><br /><a href="https://github.com/mgh99/Programacion_sistemas_Internet" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
