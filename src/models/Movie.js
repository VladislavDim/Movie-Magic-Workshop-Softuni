import { Schema, model, Types } from 'mongoose';

//create a schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'The movie title must be at least 5 characters long!'],
        maxLength: [250, 'The movie title can\'t be more than 250 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Title should contain only English letters, digits, and whitespaces.']
    },
    category: {
        type: String,
        required: true,
        enum: [
            'TV Show',
            'Animation',
            'Movie',
            'Documentary',
            'Short Film'
        ]
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'The movie genre must be at least 5 characters long!'],
        maxLength: [250, 'The movie genre can\'t be more than 250 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Genre should contain only English letters, digits, and whitespaces.']
    },
    director: {
        type: String,
        required: [true, 'Director is required!'],
        minLength: [5, 'The movie director must be at least 5 characters long!'],
        maxLength: [250, 'The movie director can\'t be more than 250 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Director\'s name should contain only English letters, digits, and whitespaces.']
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: [1900, 'Year should not be earlier than 1900.'],
        max: [2025, 'Year should not be later than 2025.']
    },
    imageUrl: {
        type: String,
        match: [/^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/i, 'Image URL should start with \'http://\' or \'https://\' and end with a valid image format (jpg, jpeg, png, gif, webp).']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required!'],
        min: 1,
        max: 10
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: 20,
        match: [/^[a-zA-Z0-9\s]+$/, 'Description should contain only English letters, digits, and whitespaces.']
    },
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