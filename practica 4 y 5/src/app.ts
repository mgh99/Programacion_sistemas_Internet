import { ApolloError, ApolloServer, gql } from "apollo-server";
import { authenticate } from "./auth";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import { User } from "./types";
import { Query } from "./resolvers/query";
import { Mutation } from "./resolvers/mutations";
import { Db } from "mongodb";
import { argsToArgsConfig } from "graphql/type/definition";
import * as dotenv from 'dotenv'

export const getToken = () => { // funcion para obtener el token
    const token = localStorage.getItem("token");
    return token;
}

export const set = (token_: any) => { //set es para cambiar cosas
    localStorage.setItem("token", token_);
}

const resolvers = {
    Query,
    Mutation
}

const run = async () => {

    console.log("Connecting to DB...");
    const db: Db = await connectDB();
    console.log("Connected to database");
    const users = await db.collection("Users");
    const recipes = await db.collection("Recipes");
    const ingredients = await db.collection("Ingredients");
    dotenv.config();
    debugger;

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {// como app. use??? recibe el request , donde me llegan los headers y todo lo que pase
        
            return {
                usersDb: users,
                recipesDb: recipes,
                ingredientsDb: ingredients,
            }
        }
    });

    server.listen(process.env.PORT).then(() => {
        console.log("Server escuchando del puerto 3000")
    })
}

try {
    run();
} catch (e) {
    console.log(e);
}
