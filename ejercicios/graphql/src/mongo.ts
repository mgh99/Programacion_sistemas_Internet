import { Db, MongoClient } from "mongodb";

export const connectDB = async (): Promise<Db> => {
  // const usr = "avalero";
  // const pwd = "nebrija";
  // const dbName: string = "parcial";
  // const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster-nebrija.gcxdd.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const mongouri: string = "mongodb+srv://mgh99:mariagh99@cluster0.r1qlh.mongodb.net/Maria?retryWrites=true&w=majority";

  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.info("MongoDB connected");

    return client.db("Maria");
  } catch (e) {
    throw e;
  }
};
