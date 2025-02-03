import genres from '../genres.js';
import categories from '../categories.js';
import Movie from '../models/Movie.js';

export default {

    getAllGenres() {
        return genres;
    },
    getAllCategories() {
        return categories;
    },
    getMovieById(movieId) {
        return Movie.findById(movieId);
    },
    getMovieByIdWithCasts(movieId) {
        return this.getMovieById(movieId).populate('casts.cast');
    },
    createMovie(movieData, creatorId) {
        return Movie.create({
            ...movieData,
            creator: creatorId
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
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    async attachCast(movieId, castId, role) {
        const movie = await Movie.findById(movieId);
        movie.casts.push({ cast: castId, role });
        await movie.save();
    }
};
