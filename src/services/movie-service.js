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
        let result = Movie.find({});

        // if (filter.search) {
        //     result = result.filter(x => x.title.toLowerCase().includes(filter.search.toLowerCase()));
        // }
        // if (filter.genre) {
        //     result = result.filter(x => x.genre.toLowerCase().includes(filter.genre.toLowerCase()));
        // }
        // if (filter.year) {
        //     result = result.filter(x => x.year == filter.year);
        // }

        return result;
    }
};
