import express from 'express';
import handelbars from 'express-handlebars';
import mongoose from 'mongoose';

import routes from './routes.js';
import showRatingHelper from './helpers/ratingHelper.js';
import ifCondHelper from './helpers/ifCondHelper.js';

const app = express();

//db connection
try {
    const uri = 'mongodb://127.0.0.1:27017/magic-movies';
    await mongoose.connect(uri);
    console.log('Connected to the database');
} catch (err) {
    console.log("Could not connect to the database. Exiting now...", err.message);
}

//set the view engine to handlebars
app.engine('hbs', handelbars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
        ifCond: ifCondHelper
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

//express settings
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});