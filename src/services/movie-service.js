import { v4 as uuid } from 'uuid';
import movies from '../movies.js';
import genres from '../genres.js';

export default {

    getAllGenres() {
        return genres;
    },
    getMovieById(movieId) {
        return movies.find(x => x.id == movieId);
    },
    createMovie(movieData) {
        const id = uuid();
        movies.push({
            id,
            ...movieData
        });
    },
    getAllMovies(filter = {}) {
        let result = movies;

        if (filter.search) {
            result = result.filter(x => x.title.toLowerCase().includes(filter.search.toLowerCase()));
        }
        if (filter.genre) {
            result = result.filter(x => x.genre.toLowerCase().includes(filter.genre.toLowerCase()));
        }
        if (filter.year) {
            result = result.filter(x => x.year == filter.year);
        }

        return result;
    }
};
