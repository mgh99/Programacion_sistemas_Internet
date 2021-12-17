import { ApolloError } from 'apollo-server-errors';
import { Collection, Db, ObjectId } from "mongodb";
import { Ingredient, User } from "../types";
import { v4 as uuidv4 } from "uuid";
const brcypt = require("bcrypt");


export const Mutation = {

    SignIn: async (parent: any, args: { email: string, pwd: string }, context: { usersDb: Collection }) => {
        const user = await context.usersDb.findOne({ email: args.email });
        if (!user) {
            const tok = uuidv4();
            const usuario = {
                email: args.email,
                pwd: encriptar((args.pwd)),
                token: null
            };
            await context.usersDb.insertOne(usuario);
            const user2 = await context.usersDb.findOne({ email: args.email });
            if (user2) {
                return {
                    id: user2._id,
                    email: user2.email as string,
                    pwd: user2.password as string,
                    token: tok,
                    //////////// cambiar 
                }
            }
        } else {
            throw new ApolloError('Usuario ya registrado', 'MY_ERROR_CODE');
        }
    },

    SignOut: async (parent: any, args: any, context: { usersDb: Collection, recipesDb: Collection }) => {

        await context.recipesDb.findOneAndDelete({ uthor: process.env.TOKEN as string });
        const user = await context.usersDb.findOneAndDelete({ id: process.env.TOKEN as string });
        return user.ok;
    },

    LogIn: async (parent: any, args: { email: string, pwd: string }, context: { usersDb: Collection }) => {
        const user = (await context.usersDb.findOne({ email: (args.email) }));// as User);
        if (user) {
            if (user.token !== null) {
                throw new ApolloError('Usuario ya loggeado', 'MY_ERROR_CODE');
            } else {
                if (brcypt.compareSync(args.pwd, user.password)) {
                    const tok = uuidv4();
                    process.env.PORT=tok;
                    (await context.usersDb.updateOne({ email: (args.email) }, { $set: { token: tok } }))
                    return true;
                } else {
                    throw new ApolloError('Las contraseñas no coinciden', 'MY_ERROR_CODE');
                }
            }
        } else {
            throw new ApolloError('Usuario no registrado', 'MY_ERROR_CODE');
        }
    },

    LogOut: async (parent: any, args: { token: string }, context: { usersDb: Collection }) => {
        (await context.usersDb.updateOne({ token: args.token }, {
            set: {
                token: null
            }
        }))
        //set(undefined);
        const user = (await context.usersDb.findOne({ token: args.token }));// as User);
        if (!user /*&& (getToken() == undefined)*/) {
            return "El token se ha borrado"
        } else {
            throw new ApolloError('Token no registrado', 'MY_ERROR_CODE');
        }
    },

    AddIngredient: async (parent: any, args: { name: string }, context: { ingredientsDb: Collection }) => {

        const ingredient = await context.ingredientsDb.findOne({ //busca el ingrediente en la base de datos por su nombre
            name: args.name,
        });

        if (ingredient) { //si el ingrediente ya existe
            throw new ApolloError('El ingrediente ya existe', 'MY_ERROR_CODE');
        } else { //si no existe lo crea y lo guarda en la base de datos
            const inserta = { //crea el ingrediente a insertar en la base de datos
                name: args.name,
                recipes: [ingredient],
            }
            await context.ingredientsDb.insertOne(inserta);
            const insertado = await context.ingredientsDb.findOne({ name: inserta.name }); //inserta.name -> comprobar de que se esta metiendo bien

            if (insertado) {
                return {
                    ...insertado,
                    id: insertado._id,
                   
                }
            }
        }


    },

    AddRecipe: async (parent: any, args: { name: string, description: string, ingredients: [String] }, context: { usersDb: Collection, recipesDb: Collection }) => {
        //añado la receta a la base de datos con los ingredientes 
        const recipe = {
            name: args.name,
            description: args.description,
            ingredients: args.ingredients,
            author: process.env.TOKEN,
        }
        await context.recipesDb.insertOne(recipe);
        const recipe2 = await context.recipesDb.findOne({ name: args.name });
        if (recipe2) {
            (await context.usersDb.updateOne({ token: process.env.TOKEN as string }, { $each: { recipes: recipe2._id } }))
            return {
                id: recipe2._id,
                name: recipe2.name as string,
                description: recipe2.description as string,
            }
        }
    },

    DeleteIngredient: async (parent: any, args: { id: string }, context: { ingredientsDb: Collection, recipesDb: Collection }) => {
        const ingredient = await context.ingredientsDb.findOne({ _id: new ObjectId(args.id), author: process.env.TOKEN as string });

        if (ingredient) {
            const borrado1 = await context.ingredientsDb.deleteOne({ _id: new ObjectId(args.id) });
            console.log(borrado1);
            const borrado2 = await context.recipesDb.deleteMany({ ingredients: args.id });
            return borrado1.acknowledged && borrado2.acknowledged;
        }
        return false;
    },

    DeleteRecipe: async (parent: any, args: { id: string }, context: { recipesDb: Collection }) => {
        const recipe = await context.recipesDb.findOne({ _id: new ObjectId(args.id) });
        if (recipe) {
            const borrado = await context.recipesDb.findOneAndDelete({ _id: new ObjectId(args.id), token: process.env.TOKEN as string });
            console.log(borrado);
            return true;
        }
        return false;
    },

    UpdateRecipe: async (parent: any, args: { name: string, description: string, ingredients: [string] }, context: { recipesDb: Collection }) => {




    },


}

///////////////  Funciones de cifrado

const encriptar = (contraseña: string) => {
    return brcypt.hashSync(contraseña, 10);//10 es la cantidad de veces que se va a encriptar la contraseña
}

const desencriptar = (contraseña: string, hash: string) => {
    return brcypt.compareSync(contraseña, hash);//compara la contraseña con el hash
}