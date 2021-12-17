import {ObjectId } from "mongodb";

export type Recipes = {
    _id?:ObjectId,
    name:string,
    description:string,
    ingredients:[Ingredient],
    author:string
  };

  export type User={
    _id?:ObjectId,
    email:string,
    password:string,
    token?:any,
    recipes?:[Recipes]
  }

  export type Ingredient={
    _id:ObjectId,
    name:string,
    recipes:[Recipes]
  }

  export type Busqueda={
    author: string,
    ingredient: string
}