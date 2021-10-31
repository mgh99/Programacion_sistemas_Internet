/* //import { MongoClient } from "mongodb";
import mongoose, { Schema } from "mongoose";

const CharacterSchema: Schema = new Schema({
    status: { type: String, required: true },
    id: { type: Number, required: true }
}, {
    collection: 'RM'
});

export default mongoose.model('Character', CharacterSchema); */