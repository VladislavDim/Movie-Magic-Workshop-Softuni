import e from "express";
import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String,
    movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

const Cast = model("Cast", castSchema);

export default Cast;