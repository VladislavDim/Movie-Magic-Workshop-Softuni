import { v4 as uuid } from 'uuid';
import movies from '../movies.js';

export default {

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
        return movies;
    }
};
