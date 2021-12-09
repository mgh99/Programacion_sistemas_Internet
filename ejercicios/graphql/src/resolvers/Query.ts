import { ApolloError, ApolloServer, gql } from "apollo-server";



export const Query = {
    getRecipes: (parent: any, args: any, {recipes}:{recipes: any}) => {
        return recipes.map((r: any, index: any) => ({
            ...r,
            id: index,
        }));
    },

    getRecipe: (_: any, {id}:{id:number}, {recipes}:{recipes:any}) => { //para recibir solo una receta
        return {
            ...recipes[id],
            id,
        }
    }
}

export const Recipe = {
    ingredients: (parent: {ingredients: number[]}, args: any, {ingredients}:{ingredients: any}) => {
        console.log("Ingredientes");
        return parent.ingredients.map((ing, index) => ({
            name: ingredients[index],
            id: index
        }))
    }
}

export const Ingredient = {
    recipes: (parent: {id:number, name: string}, args: any, {recipes}: {recipes: any}, {ingredients}:{ingredients: any}) => {
        return recipes.filter((r: { ingredients: any[]; }) => r.ingredients.some(i => i === parent.id));
    }
}