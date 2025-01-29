import { Router } from "express";
import movieService from "../services/movie-service.js";

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

movieController.post("/create", (req, res) => {
    const newMovie = req.body;
    movieService.createMovie(newMovie);
    res.redirect('/');
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);

    res.render('details', { movie });
});

export default movieController;
