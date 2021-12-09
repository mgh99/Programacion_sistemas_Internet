import { ApolloError, ApolloServer, gql } from "apollo-server";

export const typeDefs = gql`

type Ingredient {
    id:Int!
    name: String!
    recipes: [Recipe!]!
}

type IngredientInput {
    name: String!
}

type Recipe {
    id: Int!
    ingredients: [Ingredient!]!
    name: String!
}

input RecipeInput{
    title: String!
    ingredients: [Int!]!
}

type Query { 
    getRecipes: [Recipe!]!
    getRecipe(id: Int!): Recipe!
}

`
