import e from "express";
import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name must be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Name should contain only English letters, digits, and whitespaces.']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Age should not be less than 1.'],
        max: [120, 'Age should not be greater than 120.']
    },
    born: {
        type: String,
        required: [true, 'Birthplace is required!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Birthplace should contain only English letters, digits, and whitespaces.'],
        minLength: [10, 'Birthplace must be at least 10 characters long.'],
    },
    imageUrl: {
        type: String,
        match: [/^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/i, 'Image URL should start with \'http://\' or \'https://\' and end with a valid image format (jpg, jpeg, png, gif, webp).']
    },
});

const Cast = model("Cast", castSchema);

export default Cast;