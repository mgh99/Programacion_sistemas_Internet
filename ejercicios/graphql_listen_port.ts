import { ApolloServer, gql } from "apollo-server"

const typeDefs = gql`

type kkk {
    num: Int!
    saludo: String!
}

type Query {
    test(num: Int!): kkk! 
}
`
const resolvers = {
    Query: {
        test: (parent: any, args: { num: number }): { num: number, saludo: string } => {
            return {
                num: 2 * args.num,
                saludo: "bye bye my friend"
            }
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(3000).then(() => {
    console.log(`Server escuchando en el puerto 3000`);
});

//la exclamación "!" es para que el tipo sea obligatorio