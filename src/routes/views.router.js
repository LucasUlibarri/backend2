import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.render('profile', { payload: req.user });
    }
);

export default router;