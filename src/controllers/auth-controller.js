import { Router } from "express";
import authService from "../services/auth-service.js"

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const data = req.body;
    await authService.register(data);
    res.end();
});

authController.get('/login', async (req, res) => {
    res.render('auth/login');
});

export default authController;