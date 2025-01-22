import express from 'express';
import handelbars from 'express-handlebars';

import routes from './routes.js';
import showRatingHelper from './helpers/ratingHelper.js';

const app = express();

//set the view engine to handlebars
app.engine('hbs', handelbars.engine({
    extname: 'hbs',
    helpers: {
        showRating: showRatingHelper
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});