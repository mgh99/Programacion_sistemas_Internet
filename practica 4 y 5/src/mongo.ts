import { Db, MongoClient } from "mongodb";
import * as dotenv from 'dotenv';


export const connectDB = async (): Promise<Db> => {

  //const mongouri: string = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";
  dotenv.config();
  const mongouri = process.env.DB_URL as string;
  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.info("MongoDB connected");
    return client.db("Maria");
    
  } catch (e) {
    throw e;
  }
};
