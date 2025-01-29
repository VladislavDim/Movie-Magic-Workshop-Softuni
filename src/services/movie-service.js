import { v4 as uuid } from 'uuid';
import genres from '../genres.js';
import Movie from '../models/Movie.js';

export default {

    getAllGenres() {
        return genres;
    },
    getMovieById(movieId) {
        return Movie.findById(movieId);
    },
    createMovie(movieData) {
        const id = uuid();
        movies.push({
            id,
            ...movieData
        });
    },
    getAllMovies(filter = {}) {
        let query = Movie.find({});

        if (filter.search) {
            query = query.find({ title: { $regex: filter.search, $options: 'i' } });
        }
        if (filter.genre) {
            query = query.find({ genre: filter.genre });
        }
        if (filter.year) {
            query = query.find({ year: filter.year });
        }

        return query;
    }
};
