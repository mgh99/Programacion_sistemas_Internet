import { Db } from "mongodb";
import { getDocuments } from "./populated";
import express, { application } from "express";
import { freeseats, free, signin, login, logout, book, mybookings } from "./resolvers";
import { nextTick } from "process";
import { uuid } from "uuidv4";

//** geter y setter del token */
let token: any;
export const getToken = () => {
  return token;
}
export const set = (token_: any) => { //set es para cambiar cosas
  token = token_;
}

const checkDate = (
  day: string,
  month: string,
  year: string
): boolean => {
  console.log(`${year}-${month}-${day}`);
  if (((month === "4" || month === "6" || month === "9" || month === "11") && (day > "0" && day <= "30")) ||
    ((month === "1" || month === "3" || month === "5" || month === "7" || month === "8" || month === "10" || month === "12") && (day > "0" && day <= "31")) ||
    ((month === "2") && (parseInt(year) % 4 === 0 || parseInt(year) % 400 === 0 && !(parseInt(year) % 100 === 0)) && (day > "0" && day <= "29")) ||
    ((month === "2") && (day > "0" && day <= "28"))) {

    const fechahoy = new Date();
    const fecha = new Date(`${year}-${month}-${day}`);

    // console.log(`fecha ${fecha.getTime()} \n fecha hoy : ${fechahoy.getTime()}\n ${(fecha.getTime()>=fechahoy.getTime())}`)
    return (fecha.getTime() >= fechahoy.getTime());
  } else {
    return false;
  }

};

const bodyParser = require("body-parser");

const run = async () => {

  const db: Db = await getDocuments();//ya me devuelve la base de datos ya conectada
  const app = express(); //inicio el servidor
  app.set("db", db); //asocio el nombre db a la cte de db

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  ///Los USE : funciones que las usamos de seguratas (VALIDACION PARA QUE FUNCIONE MAS TARDE LA FUNCION)
  app.use("/freeseats", (req, res, next) => {

    //requiere estar logeado
    if (getToken() === undefined || !req.headers.token || req.headers.token !== getToken()) {
      return res.status(500).send("Token incorrecto o no está");
    }

    //validar la fecha para que sea presente o futura pero no pasada
    if (checkDate((req.query.day as string), (req.query.month as string), (req.query.year as string)) === false) {
      return res.status(500).send("Fecha mal introducida");
    } else {
      next();
    }
  })

  app.use("/book", (req, res, next) => {

    //requiere estar logeado
    if (getToken() === undefined || !req.headers.token || req.headers.token !== getToken()) {
      return res.status(500).send("Token incorrecto o no está");
    }

    //validar la fecha para que sea presente o futura pero no pasada
    if (checkDate((req.query.day as string), (req.query.month as string), (req.query.year as string)) === false) {
      return res.status(500).send("Fecha mal introducida");
      //no exista los asientos  o que haya 20 asientos 
    } else if((req.query === undefined) || !((parseInt(req.query.seat as string) > 0) && parseInt(req.query.seat as string) <= 20)){
      return res.status(404).send("No hay los asientos que solicita");
    } else {
      next();
    }

  })

  app.use("/mybookings", (req, res, next) => {

    //requiere estar logeado
    if (getToken() === undefined || !req.headers.token || req.headers.token !== getToken()) {
      return res.status(500).send("Token incorrecto o no está");
    }

    //validar la fecha para que sea presente o futura pero no pasada
    if((req.query === undefined)){
      return res.status(500).send("No hay ninguna reserva hecha");
    } else {
      next();
    }

  })

  app.use("/free", (req, res, next) => {

    //requiere estar logeado
    if (getToken() === undefined || !req.headers.token || req.headers.token !== getToken()) {
      return res.status(500).send("Token incorrecto o no está");
    }

    //validar la fecha para que sea presente o futura pero no pasada
    if (checkDate((req.body.day as string), (req.body.month as string), (req.body.year as string)) === false) {
      return res.status(500).send("Fecha mal introducida");
    } else if((req.query === undefined)){
      return res.status(500).send("No hay ninguna reserva hecha");
    } else {
      next();
    }

  })

  app.use("/signin", (req, res, next) => {
    if (!req.body.email || !req.body.contraseña) {
      return res.status(404).send("Completa los campos vacíos");
    } else {
      next();
    }
  })

  app.use("/login", (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.contraseña) { //req.body = mi cuerpo esta vacío
      return res.status(404).send("Datos incorrectos");
    } else {
      next();
    }
  })

  app.use("/logout", (req, res, next) => {
    //no se ha logeado e intenta acceder o que el token este mal por los headers o si mi token es diferente al de header
    if (getToken() === undefined || !req.headers.token || req.headers.token !== getToken()) {
      return res.status(404).send("Token incorrecto o no está");
    } else {
      next();
    }
  });


  ///GETs ->obtener
  app.get("/status", async (req, res) => {
    const date = new Date();
    res.status(200).send(`DATE: ${date.getDate()} - ${date.getMonth()} - ${date.getUTCFullYear()}`);
  });
  app.get("/freeseats", freeseats);
  app.get("/mybookings", mybookings);

  ///POSTs -> subir 
  app.post("/free", free);
  app.post("/signin", signin);
  app.post("/login", login);
  app.post("/logout", logout);
  app.post("/book", book);
  

  await app.listen(3000);
};

/// estoy corriendo esto
try {
  run();
} catch (e) {
  console.error(e);
}
