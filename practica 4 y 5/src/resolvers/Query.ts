import {ApolloError, ApolloServer, gql } from "apollo-server";
import { query, Request, Response } from "express";
import { Db } from "mongodb";
import { uuid } from "uuidv4";

const brcypt = require("bcrypt");

//donde se encuentran los datos
export const Query = {

    //devuleve una lista de todos los usuarios
    getUsers: async (parent: any, args: any, context: any, info: any) => {
        return context.prisma.users(); //devuelve todos los usuarios
    },

    //devuelve un usuario por su id
    getUser: async (parent:any, args: any, context: any, info: any) => {
        return context.prisma.user({id: args.id}); //devuelve un usuario
    },

    //añade los ingredientes 
    addIngredient: async (parent: any, args: any, context: any, info: any) => {
        return context.prisma.createIngredient({
            name: args.name,
            description: args.description,
            category: { //category se refiere a la tabla category
                connect: { //connect se refiere a la tabla connect
                    id: args.categoryId //id se refiere a la columna id de la tabla category
                }
            }
        })
    },

    //elimina un ingrediente
    deleteIngredient: async (parent: any, args: any, context: any, info: any) => {
        return context.prisma.deleteIngredient({id: args.id});
    },

    //añade una receta
    addRecipe: async (parent: any, args: any, context: any, info: any) => {
        return context.prisma.createRecipe({
            name: args.name,
            description: args.description,
            ingredients: {
                connect: args.ingredients
            }
        })
    },

    //actualiza una receta
    updateRecipe: async (parent: any, args: any, context: any, info: any) => {
        return context.prisma.updateRecipe({
            data: {
                name: args.name,
                description: args.description,
                ingredients: {
                    connect: args.ingredients
                }
            },
            where: { //where se refiere a la tabla where
                id: args.id
            }
        })
    },

    //elimina una receta
    deleteRecipe: async (parent: any, args: any, context: any, info: any) => {
        return context.prisma.deleteRecipe({id: args.id});
    },

    //devuelve todos los ingredientes de una receta
    getRecipes: (parent: any, args: any, {recipes}:{recipes: any}) => {
        return recipes.map((r: any, index: any) => ({
            ...r, //copia todas las propiedades del objeto, los ... son para que no se pierdan las propiedades
            id: index,
        }));
    },

    //devuelve un ingrediente de una receta
    getRecipe: (_: any, {id}:{id:number}, {recipes}:{recipes:any}) => { //para recibir solo una receta
        return {
            ...recipes[id],
            id,
        }
    }

}
