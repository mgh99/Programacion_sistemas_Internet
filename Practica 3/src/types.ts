import exp from "constants";
import { NumericType } from "mongodb";

export type Documentos = {
    day:number,
    month:number,
    year:number,
    seat:number,
    token:string //identificador
  };

export type Usuario = {
  email: string,
  contraseña: string,
  token: any
};
