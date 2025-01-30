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
       return Movie.create(movieData);
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
    },
    async attachCast(movieId, castId) {
        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);
        await movie.save();
    }
};
