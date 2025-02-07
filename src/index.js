import express from 'express';
import handelbars from 'express-handlebars';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import routes from './routes.js';
import showRatingHelper from './helpers/ratingHelper.js';
import ifCondHelper from './helpers/ifCondHelper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';
import { tempData } from './middlewares/temp-data-middleware.js';

const app = express();

//db connection
try {
    const uri = process.env.DATABASE_URL;
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
app.use(cookieParser());
app.use(expressSession({
    secret: "asd2312ft$%3df3242ds3",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true
    }
}));
app.use(tempData);
app.use(authMiddleware());

app.use(routes);

app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});