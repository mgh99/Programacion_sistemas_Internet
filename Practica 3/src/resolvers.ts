import { v4 as uuidv4 } from "uuid";
import { query, Request, Response } from "express";
import { Db } from "mongodb";
import { Documentos, Usuario } from "./types";
import { uuid } from "uuidv4";
import { set, getToken } from "./app";
import { parse } from "path/posix";

//POSTMAN: tiene 3 formas de pasar datos 
/*
  1) params : /characters/:id = para filtrar por parametro
  2) query:   /characters = por la tabla de key value en postman 
  3) body:    /characters = se manda por la tabla de key value de body en postman 

*/

/*
POSTMAN:
  Key: el nombre de la varible en este caso email
  Value como se llama el email (ejmeplo: pepe@gmail.com)
*/


/***********************************************************
AQUI EMPIEZA LA PRACTICA 3 
CHAN
    CHAN
        CHAN!!!
*/
//******************************************************** */

export const signin = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");

  const user = await db.collection("Users").findOne({
    email: (req.body.email as string) //como lo necesito que sea un string en el mongo lo guardo como string porque sino es de tipo any
  }) as Db;

  if (user)// es lo mismo que user != NULL
  {
    return res.status(409).send("Usuario ya registrado");
  }

  const usuario: Usuario = {
    email: (req.body.email as string),
    contraseña: (req.body.contraseña as string),
    token: uuidv4()
  };
                                                                //luego de que se haya resuelto se ejecuta esto
  const chars = await db.collection("Users").insertOne(usuario).then((elem: any) => {
    return res.status(200).send(`Vamos a registrar en la base de datos un usuario con\remail: ${req.body.email}\rContraseña: ${req.body.contraseña}`);
  }).catch((error: any) => {
    return res.status(500).send(`Ha surgido un problema al hacer el registro\nError:${error}`);
  });

}

//login = si el usuario y la contraseña son correctos entonces se puede entrar
export const login = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");

  const user: Usuario = await db.collection("Users").findOne({
    email: (req.body.email as string),
    contraseña: (req.body.contraseña as string)
  }) as Usuario;

  if (user) {
    const tok = user.token;//genera el token
    set(tok);
    return res.status(200).send(`Usuario logeado, token ${tok}`);
  } else {
    return res.status(401).send("No se puede logear");
  }

}

//logout = una vez el usuario ha entrado quiere salir
export const logout = async (req: Request, res: Response) => {

  set(undefined);
  if (getToken() == undefined) {
    return res.status(200).send("El token se ha eliminado con éxito y has hecho log out");
  } else {
    return res.status(500).send("No se ha eliminado el token")
  }

}

//freeseats = asientos libres
export const freeseats = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");

  const seats: Documentos[] = await db.collection("Documentos").find({
    day: parseInt((req.query.day as string)),
    month: parseInt((req.query.month as string)),
    year: parseInt((req.query.year as string))
  }).toArray() as Documentos[];

  let seat: Array <Number> = [];

  for(let i = 1; i <= 20; i++) {
    seat.push(i);
  }

  seats.forEach(elem => {
    seat = seat.filter(num => num !== elem.seat); //filtra por cada numero de sitios
  })

  return res.status(200).json(seat); //esto significa devolver un json (ALUCINANDOOO)
}

//book = reserva de los sitios
export const book = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");

  const books: Documentos[] = await db.collection("Documentos").find({
    day: parseInt((req.query.day as string)),
    month: parseInt((req.query.month as string)),
    year: parseInt((req.query.year as string)),
    seat: parseInt((req.query.seat as string))
  }).toArray() as Documentos[];

  if(books.length === 1){ //implica que hay una ocurrencia en mi base de datos
    return res.status(404).send(`Numero de asiento ${req.query.seat} ya ha sido reservado\n`);
  }
  
  const documentos: Documentos = {
    day: parseInt((req.query.day as string)),
    month: parseInt((req.query.month as string)),
    year: parseInt((req.query.year as string)),
    seat: parseInt((req.query.seat as string)),
    token: req.headers.token as string
  };

  const char= await db.collection("Documentos").insertOne(documentos).then((elem: any) => {
    return res.status(500).json(`Tu reserva es en la fecha ${req.query.day} - ${req.query.month} - ${req.query.year} y con numero de reserva ${req.query.seat}`);
  }).catch((error:any) => {
    return res.status(404).send("Algo ha ido mal al hacer la reserva");
  });

}

//free = liberar un sitio reservado
export const free = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db"); //solicitud base de datos

  //Se borra la que estoy buscando
  const char = await db.collection("Documentos").deleteOne(
    { day: parseInt((req.body.day as string)), 
      month: parseInt((req.body.month as string)), 
      year: parseInt((req.body.year as string)), 
      seat: parseInt((req.body.seat as string)),
      token: req.headers.token }
  );

  //devuleve una pequeña estructura y te dice si la ha borrado o no
  if (char.deletedCount === 1) { //1 = es que lo ha borrado
    return res.status(200).send("Reserva anulada con éxito");
  } else {
    return res.status(404).send("No había reservas a tú nombre con ese sitio");
  }
}

export const mybookings = async (req:Request, res:Response)=>{
  const db: Db = req.app.get("db");

  let puest: Documentos[] = (await db.collection("Documentos").find({ 
    token:req.headers.token 
  }).toArray() as Documentos[]);

  const fechahoy = new Date();

  for(let i=0; i<puest.length; i++){
    let fecha = new Date(`${puest[i].year}-${puest[i].month}-${puest[i].day}`);
    if(fecha.getTime()<=fechahoy.getTime() === true){
      puest.filter(elem=> elem !== puest[i]);
    }
  }

  if(puest.length === 0){
    return res.status(404).send("No hay ninguna reserva futura")
  }else{
    return res.status(200).send(puest);
  }
}
