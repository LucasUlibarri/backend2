import dotenv from 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import sessionRouter from './routes/session.router.js'
import passport from 'passport';
import { initializedPassport } from './passport/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

//conexion Mongo
mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error MongoDB:', err.message));

//Passport
initializedPassport()
app.use(passport.initialize());

//handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//routes
app.use('/session', sessionRouter)
app.get('/session/register', (req, res) => res.render('register'));
app.get('/session/login',    (req, res) => res.render('login'));
app.get(
  '/session/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => res.render('profile', { payload: req.user })
);

//servidor
app.listen(PORT, () => console.log(`listening on port ${PORT}`))