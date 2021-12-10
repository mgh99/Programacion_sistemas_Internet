import { ApolloError, ApolloServer, gql } from "apollo-server";
//import { authenticate } from "./auth";
import { connectDB } from "./mongo";
import { typeDefs } from "./schema";
import { Query } from "./resolvers/Query";

const resolvers = {
    Query,
}

const run = async () => {
    const db = await connectDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
            return {
                db,
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
