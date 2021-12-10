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
    title: String!
    description: String!
    ingredients: [Ingredient!]!
    author: User!
}

input RecipeInput{
    title: String!
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

type Query { 

    signin(email: String!, pwd: String!): User!
    signout(token: String!): User!
    login(email: String!, pwd: String!): User!
    logout(token: String!): User!

    addIngredient(name: String!): Ingredient
    deleteIngredient(id: ID!): Ingredient
    addRecipe(name: String!, description: String!, ingredients: [ID!]!): Recipe
    updateRecipe(id: ID!, name: String, description: String, ingredients: [ID!]): Recipe
    deleteRecipe(id: ID!): Recipe

    getRecipes: [Recipe!]!
    getRecipe(id: Int!): Recipe!
    getUser: User!
    getUsers: [User!]!
}
`