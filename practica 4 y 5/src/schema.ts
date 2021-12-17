import { ApolloError, ApolloServer, gql } from "apollo-server";

export const typeDefs = gql`
type Ingredient {
    id: ID!
    name: String!
    recipes: [Recipe!]!
}

type Recipe {
    id: ID!
    title: String!
    description: String!
    ingredients: [Ingredient!]!
    author: User!
}

type User {
    id: ID!
    email: String!
    pwd: String!
    token: String
    recipes: [Recipe!]!
}

input Busqueda{
    author: String!
    ingredient: String!
}

type Query{
    getUser(id: String!): User
    getUsers:[User]!
    getRecipe(id: String!): Recipe
    getRecipes(busqueda: Busqueda): [Recipe]
}

type Mutation{
    LogIn(email: String!, pwd: String!): Boolean!
    LogOut: String
    SignIn(email: String!, pwd: String!): User!
    SignOut:Boolean!
    AddIngredient(name: String!): Ingredient
    AddRecipe(name: String!, description: String!, ingredients: [String]!): Recipe
    DeleteRecipe(id: String!): Boolean!
    UpdateRecipe(name: String!, description: String!, ingredients: [String]!): Recipe
    DeleteIngredient(id: String!): Boolean!
}

`