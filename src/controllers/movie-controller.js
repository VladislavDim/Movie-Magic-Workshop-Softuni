import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";

const movieController = Router();

movieController.get("/search", async (req, res) => {
    const movieData = req.query;
    const movies = await movieService.getAllMovies(movieData);
    const genres = movieService.getAllGenres();
    res.render('search', { movies, movieData, genres });
});

movieController.get("/create", (req, res) => {
    res.render('create');
});

movieController.post("/create", async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    await movieService.createMovie(newMovie, userId);
    res.redirect('/');
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieByIdWithCasts(movieId);
    const isCreator = movie.creator && movie.creator.toString() === req.user?.id;

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const casts = await castService.getAllCasts({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;

    const role = req.body.role;
    const castId = req.body.cast;

    await movieService.attachCast(movieId, castId, role);

    res.redirect(`/movies/${movieId}/details`);
});
export default movieController;
