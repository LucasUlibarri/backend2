import passport from 'passport';
import LocalStrategy from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../modules/user.model.js';
import { PRIVATE_KEY, createHash, validatePassword, generateToken, extractCookie } from '../utils.js';

export const initializedPassport = () => {
  // Register
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          if (await User.findOne({ email }))
            return done(null, false, { message: 'User exists' });
          const user = await User.create({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            role: 'USER'
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Login
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user || !validatePassword(password, user.password))
            return done(null, false, { message: 'Invalid credentials' });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // JWT
  passport.use(
    'jwt',
    new JwtStrategy(
      {
        secretOrKey: PRIVATE_KEY,
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie])
      },
      (payload, done) => {
        User.findById(payload.id)
          .then(user => (user ? done(null, user) : done(null, false)))
          .catch(err => done(err, false));
      }
    )
  );
};