import movies from '../movies.js';

export default {
    
    getMovieById(movieId) {
        return movies.find(x => x.id == movieId);
    }

};
