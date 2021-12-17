import {ObjectId } from "mongodb";

/**
 * Los tipos que estamos usando aqui son para poder manupular mejor el mongo
 * En los arrays de otro tipo de datos voy sa guardar unicamente el id, para luego hacer mas facil la busqueda
 * Ponemos los ? para que cuando creemos el usuario o la receta etc... sea mas productivo.
 * 
 */
export type Recipes = {
    _id?:string,
    name:string,
    description:string,
    ingredients:[string],
    author:string
  };

  export type User={
    _id?:string,
    email:string,
    pwd:string,
    token?:any,
    recipes?:[string]
  }

  export type Ingredient={
    _id?:string,
    name:string,
    recipes?:[string]
  }
  export type Busqueda={
    author: string,
    ingredient: string
}