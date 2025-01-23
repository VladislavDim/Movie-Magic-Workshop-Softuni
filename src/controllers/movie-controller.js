import { Router } from "express";
import movieService from "../services/movie-service.js";

const movieController = Router();

movieController.get("/search", (req, res) => {
    const movies = movieService.getAllMovies();
    res.render('search', { movies });
});

movieController.get("/create", (req, res) => {
    res.render('create');
});

movieController.post("/create", (req, res) => {
    const newMovie = req.body;
    movieService.createMovie(newMovie);
    res.redirect('/');
});

movieController.get("/:movieId/details", (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getMovieById(movieId);

    res.render('details', { movie });
});

export default movieController;
