import { ApolloError, ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import { Query} from "./resolvers/query";
import { Mutation} from "./resolvers/mutations";
import { Db } from "mongodb";
import * as dotenv from "dotenv";
const resolvers = {
    Query,
    Mutation
}

const run = async () => {

    console.log("Connecting to DB...");
    const db:Db = await connectDB();
    console.log("Connected to database");
    const users =await db.collection("Users");
    const recipes =await db.collection("Recipes");
    const ingredients =await db.collection("Ingredients");
    dotenv.config();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {// como app. use??? recibe el request , donde me llegan los headers y todo lo que pase
            return{
                token_header:req.headers.token,
                usersDb:users,
                recipesDb:recipes,
                ingredientsDb:ingredients,  
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