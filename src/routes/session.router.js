import { Router } from "express";
import passport from "passport";
import { generateToken } from '../utils.js';

const router = Router();

function userDTO(user) {
    return {
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
    };
}   

//Register
router.post(
    '/register',
    passport.authenticate('register', {session: false}),
    (req, res) => {
        res.status(201).json({status: 'success', payload: req.user});
    }
);

//Login
router.post(
    '/login',
    passport.authenticate('login', {session: false}),
    (req, res) => {
        const token = generateToken(req.user);
        res
        .cookie('access_token', token, {httpOnly: true})
        .json({status: 'success', payload: req.user});
    }
);

//Current
router.get(
    '/api/session/current', 
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({status: 'success', payload: userDTO(req.user)});
    }
);

export default router;