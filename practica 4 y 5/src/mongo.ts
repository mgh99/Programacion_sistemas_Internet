import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";

export const connectDB = async (): Promise<Db> => {
  // const usr = "avalero";
  // const pwd = "nebrija";
  // const dbName: string = "parcial";
  // const mongouri: string = `mongodb+srv://SantiNebrija:Tiburon5050111@basedatosprogra.gli9m.mongodb.net/Santiago?retryWrites=true&w=majority`;
  dotenv.config();
  const mongouri: string = process.env._URL as string;
  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.info("MongoDB connected");
    return client.db("Cocina");
  } catch (e) {
    throw e;
  }
};
