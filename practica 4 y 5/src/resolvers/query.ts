import { ApolloError, ApolloServer, gql } from "apollo-server";
import { AnyBulkWriteOperation, Collection, ObjectId } from "mongodb";
import { Busqueda, Recipes } from "../types";


//donde se encuentran los datos
export const Query = {

    getUser: async (parent: any, args: { id: string }, context: { usersDb: Collection }) => {
        const user = await context.usersDb.findOne({ _id: new ObjectId(args.id) });
        if (user) {
            return {
                ...user,
                id: user.id,
            }
        }
    },
    getUsers: async (parent: any, args: {}, context: { usersDb: Collection }) => {
        const usuarios = await context.usersDb.find().toArray();
        return usuarios.map(elem => ({
            id: elem._id,
            email: elem.email,
            token: elem.token,
            pwd: elem.password
        }))
    },
    getRecipe: async (parent: any, args: { id: string }, context: { recipesDb: Collection }) => {
        const recip = await context.recipesDb.findOne({ _id: new ObjectId(args.id) });// as Recipes;
        if (recip) {
            return {
                ...recip,
                id: recip.id
            }
        }
    },
    getRecipes: async (parent: any, args: { busqueda: Busqueda }, context: { recipesDb: Collection }) => {

        const recetas = [];
        if (args.busqueda.author !== "") {
            recetas.push(await context.recipesDb.find({ author: args.busqueda.author }));
        }
        if (args.busqueda.ingredient !== "") {
            recetas.push(await context.recipesDb.find({ ingredients: args.busqueda.ingredient }).toArray());
        }

        if (args.busqueda.author == "" && args.busqueda.ingredient == "") {
            recetas.push(await context.recipesDb.find().toArray())
        }
        let conversion;
        recetas.forEach(Cada_array_de_Recetas => {
            Cada_array_de_Recetas.map(elem => {
                return {
                    id: elem._id,
                    title: elem.title,
                    description: elem.description,
                    ingredients: []
                }
            })

        })
        return conversion;
    }

}

////////////////////Funciones