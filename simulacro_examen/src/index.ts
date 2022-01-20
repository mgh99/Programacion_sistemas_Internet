import { ApolloServer, ApolloError } from "apollo-server";
import {typeDefs} from "./schema";
import {Query, Character, Episode, Location} from "./resolvers/query";

const resolvers = {
    Query,
    Character,
    Episode,
    Location
}

const run = async () => {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.listen(5000).then(() => {
        console.log("Server escuchando del puerto 5000");
    })

}

try {
    run();
} catch (e) {
    console.error(e);
}   