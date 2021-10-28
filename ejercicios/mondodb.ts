//Para instalarlo en el VSCode: npm install -s mondodb
import { MongoClient } from "mongodb"

const uri = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//es asíncrono
client.connect().then(() => {
    console.log("Me he conectado a la base de datos");
    //ACCEDER A UN DATO
    //Covertir el documento en array es lo que le hace una promesa
    client.db("Maria").collection("alumnos")
        .find() //Busco todos los documentos
        .toArray() //Los convierto en un array
        //esto me devuelve una promesa
        .then((results => {
            //Dentro de ,i coleccion de alumnos, inserto uno nuevo que es Penélope
            client.db("Maria").collection("alumnos").insertOne(
                {
                    "name": "Penélope",
                    "apellido": "Ancona",
                    "edad": 23
                }
            ).then(()=> console.log("Penélope dentro"));

            //lo que me devuleve lo capturo
            console.log(results[0]); //muestro por pantalla el primero de ellos
        })).catch(e => console.log(e));
}).catch((e) => {
    console.log(e);
});







//     err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
