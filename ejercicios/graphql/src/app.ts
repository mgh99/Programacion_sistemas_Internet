import { ApolloError, ApolloServer, gql } from "apollo-server";
import { authenticate } from "./auth";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import { Query, Ingredient, Recipe } from "./resolvers/Query";

const recipes = [
    { name: "paella", ingredients: [0, 1, 2] },
    { name: "lentejas", ingredients: [0, 2] },
    { name: "cocido", ingredients: [2] },
]

const ingredients = ["arroz", "lentejas", "garbanzos"];

const resolvers = {
    Query,
    Ingredient,
    Recipe
}

const run = async () => {
    const db = await connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
            return {
                recipes, ingredients
            }
        }
    });

    server.listen(3000).then(() => {
        console.log("Server escuchando del puerto 3000")
    })

}

try{
    run();
}catch(e){
    console.log(e);
}
