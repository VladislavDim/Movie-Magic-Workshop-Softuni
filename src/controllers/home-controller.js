import { Router } from 'express';
import movieService from '../services/movie-service.js';

const router = Router();

router.get('/', (req, res) => {
    const movies = movieService.getAllMovies();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});
export default router; 