import dotenv from 'dotenv/config';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import sessionRouter from './routes/session.router.js'
import passport from 'passport';
import { initializedPassport } from './passport/index.js';
import viewsRouter from './routes/views.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

//conexion Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error MongoDB:', err.message));

initializedPassport();
app.use(passport.initialize());

//handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// Ruta principal
app.get('/', (req, res) => { res.render('index'); });

app.use('/session', sessionRouter);
app.use('/views', viewsRouter);

//servidor
app.listen(PORT, () => console.log(`listening on port ${PORT}`))