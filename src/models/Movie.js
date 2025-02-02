import { Schema, model, Types } from 'mongoose';

//create a schema
const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: Number,
    imageUrl: String,
    rating: Number,
    description: String,
    casts: [{
        //_id: false,
        role: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        }
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

//create a model
const Movie = model('Movie', movieSchema);

//export the model
export default Movie;