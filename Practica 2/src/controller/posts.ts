import { Request, Response, NextFunction, request } from 'express';
import {ArrayOperator, DeleteResult, MongoClient}from "mongodb";
import axios, { AxiosResponse } from 'axios';

/// Es lo que me devuelve mi mongo 
type Episode={
    name:string,
    episode:string
}
type characterintro={
    id:number,
    name:string,
    status:string,
    species:string,
    episode:Array<Episode>//array de string
}

type character={
    id:number,
    name:string,
    status:string,
    episode:Array<Episode>
}

//INDICA AL SERVIDOR QUE ESTA TODO BIEN Y PUEDE RECIBIR PETICIONES
const getstatus = async (req: Request, res: Response, next: NextFunction) => {
    if (res.statusCode === 200) {
        return res.json({
            Status: res.statusCode,
            Body: "OKProgramacion-I"
        })
    }
    else {
        return res.json({
            Status: res.statusCode,
            Body: "Not found"
        })
    }
};


//OBTIENE TODOS LOS PERSONAJES DE LA SERIE
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    // get some posts
    const uri = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    client.connect().then(()=>{    
    client.db("Rick&Morty").collection("characters").find().toArray().then((rest=>{
        let personajes:characterintro[]=rest as characterintro[];
        return res.status(200).json({
            message: personajes
        });
    }))})

};

//OBTIENE UN SOLO PERSONAJE EN CONCRETO DE LA SERIE
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    let id:number=+req.params.id;
    const uri = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    client.connect().then(()=>{    
    client.db("Rick&Morty").collection("characters").find({id:id}).toArray().then((rest=>{
        let personajes:characterintro[]=rest as characterintro[];
        if(personajes!=[]){
        let deVuelta:character={
            id:personajes[0].id,
            name:personajes[0].name,
            status:personajes[0].status,
            episode:personajes[0].episode
        }
        return res.status(200).json({
            message: deVuelta
        });
    }else{
        return res.status(404).json({
            message: "Not found"
        });
    }
    }))})
};

//CAMBIA EL STATUS DE UN PERSONAJE, DEVUELVE LOS DATOS DEL PERSONAJE Y SI TODO SALE BIEN SALE UN MENSAJE
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const uri = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    let identifier: string = req.params.id;
    const valor: number = +identifier;
    let change_status: string = "unknown";

    client.connect().then(async () => {
        console.log("Conectado a la base de datos");

        const result = await client.db("Rick&Morty").collection("characters").findOne({ id: valor });

        if (result) {

            //Encontramos status
            Object.keys(result).forEach((k: string) => {
                if (k == "status") {
                    change_status = `${(result)[k]}`;
                }
            });

            //Cambiar el status
            if (change_status == "Alive") {
                change_status = "Dead";
            } else if (change_status == "Dead") {
                change_status = "Alive";
            }

            //Actualizar el status
            const filter = { id: valor };
            const updatePost = {
                $set: {
                    status: change_status
                }
            };
            let result_status_change = await client.db("Rick&Morty").collection("characters").findOneAndUpdate(filter, updatePost);
            
            //Formato
            let resu = await client.db("Rick&Morty").collection("characters").find({ id: valor }).toArray();
            const updatecharacter = resu.map((result) => {
                const { id, name, status, episode } = result;
                return {
                    id,
                    name,
                    status,
                    episode: episode.map((epi: Episode) => {
                        return {
                            name: epi.name,
                            episode: epi.episode,
                        }
                    }),
                }
            });

            return res.status(200).json({
                Status: 200,
                Body: updatecharacter
            });

        } else {

            return res.status(200).json({
                Status: 404,
                Body: "Not Found"
            });

        }
    })
};

//BORRA UN PERSONAJE Y SI TODO SALE BIEN SALE UN MENSAJE
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const uri = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    let identifier: string = req.params.id;
    const valor: number = +identifier;

    client.connect().then(async () => {
        console.log("Conectado a la base de datos");
        let result = await client.db("Rick&Morty").collection("characters").findOne({ id: valor });
        if (result) {
            let result = await client.db("Rick&Morty").collection("characters").deleteOne({ id: valor });
            return res.status(200).json({
                Status: 200,
                Body: "OK"
            });
        } else {
            return res.status(200).json({
                Status: 404,
                Body: "Not Found"
            });
        }
    })

};


export default { getPosts, getPost, updatePost, deletePost, getstatus};
