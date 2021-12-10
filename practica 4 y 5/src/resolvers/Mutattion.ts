import {UserInput} from "./src/schema";

export const Mutation = {

    signin: async (parent: any, args: {usuario: UserInput}) => {
        const user = await ctx.db.mutation.signin({ data: args }, info);
        return user;
    }

    

    
}