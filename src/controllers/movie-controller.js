import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/error-utils.js";

const movieController = Router();
const categories = movieService.getAllCategories();

movieController.get("/search", async (req, res) => {
    const movieData = req.query;
    const movies = await movieService.getAllMovies(movieData);
    const genres = movieService.getAllGenres();
    res.render('search', { movies, movieData, genres });
});

movieController.get("/create", isAuth, (req, res) => {
    res.render('create');
});

movieController.post("/create", isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    await movieService.createMovie(newMovie, userId);
    res.redirect('/');
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieByIdWithCasts(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const casts = await castService.getAllCasts({ exclude: movie.casts });
    
    if (!movie.creator?.equals(req.user?.id)) {
        res.setError('You are not the movie owner!')
        return res.redirect('/404');
    }

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const role = req.body.role;
    const castId = req.body.cast;

    await movieService.attachCast(movieId, castId, role);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);

    if (!movie.creator?.equals(req.user?.id)) {
        res.setError('You are not the movie owner!')
        return res.redirect('/404');
    }

    await movieService.delete(movieId);
    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);

    if (!movie.creator?.equals(req.user?.id)) {
        res.setError('You are not the movie owner!')
        return res.redirect('/404');
    }

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    try {
        await movieService.updateMovieById(movieId, movieData);
    } catch (err) {
        return res.render('movie/edit', { movie: movieData, categories, errMessage: getErrorMessage(err) });
    }

    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;
