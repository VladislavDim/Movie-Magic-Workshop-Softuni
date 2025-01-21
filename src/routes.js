import { Router } from 'express';
import homeController from './controllers/home-controller.js';

const routes = Router();

routes.use(homeController);

//render the not found page
routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
