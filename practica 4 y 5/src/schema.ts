import { ApolloError, ApolloServer, gql } from "apollo-server";

export const typeDefs = gql`
type Ingredient {
    id: ID!
    name: String!
    recipes: [Recipe!]!
}
input IngredientInput {
    name: String!
}
type Recipe {
    id: ID!
    name: String!
    description: String!
    ingredients: [Ingredient!]!
    author: User!
}
input RecipeInput{
    name: String!
    ingredients: [Int!]!
}
type User {
    id: ID!
    email: String!
    pwd: String!
    token: String
    recipes: [Recipe!]!
}
input UserInput { 
    email: String!
    pwd: String!
}

input Busqueda {
    author: String!
    ingredient: String!
}
type Query{
    
    getUser(id: String!): User
    getUsers:[User]
    getRecipe(id: String!): Recipe
    getRecipes(busqueda: Busqueda): [Recipe]
}
type Mutation{
    
    SignIn(email: String!, pwd: String!): User!
    LogIn(email: String!, pwd: String!): Boolean!
    LogOut: String!
    AddIngredient(name: String!): Ingredient
    AddRecipe(name: String!, description: String!, ingredients: [String]!): Recipe
    SignOut:Boolean!
    DeleteRecipe(id: String!): Boolean!
    UpdateRecipe(name: String!, description: String!, ingredients: [String]!): Recipe
    DeleteIngredient(id: String!): Boolean!
}

`