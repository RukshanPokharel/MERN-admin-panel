
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import 'express-async-errors';
import morgan from 'morgan';

import bodyParser from 'body-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// COOKIE
import cookieParser from 'cookie-parser';

// DB AND AUTH
import connectDB from './db/connect.js';

// ROUTERS
import authRouter from './routes/authRoutes.js';
import blogsRouter from './routes/blogsRouter.js';
import jobsRouter from './routes/jobsRouter.js';
import landingPageRouter from './routes/landingPageRouter.js';
// import webBlogsRouter from './routes/webBlogsRouter.js';


// MIDDLEWARE
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "media-src": ["'self'", "https://nanoscalesimulations.com"],
            // "script-src": ["'self'"],
            // "script-src-elem": ["'self'"]
        }
    }
}));
app.use(xss());
app.use(mongoSanitize());

// added for adding image in blog
// --------------
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/blogImages', express.static('blogImages'));
// ---------------------------------


// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blog', authenticateUser, blogsRouter);
app.use('/api/v1/landing-blog', landingPageRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
// app.use('/api/v1/blogs', authenticateUser, blogsRouter);



// only when ready to deploy
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// ENV FILE
const port = process.env.PORT || 5000;


// DB CONNECT FILE
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();