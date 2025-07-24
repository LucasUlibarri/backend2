import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PRIVATE_KEY = process.env.PRIVATE_KEY || 'test_key';

// genera hash de la contraseña
export const createHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// valida contraseña contra el hash
export const validatePassword = (password, hashed) =>
  bcrypt.compareSync(password, hashed);

// genera un JWT y lo retorna
export const generateToken = user => 
  jwt.sign(
    { id: user._id, email: user.email, role: user.role || 'USER' },
    PRIVATE_KEY,
    { expiresIn: '1h' }
  );

// extrae el token de la cookie
export const extractCookie = req =>
  req?.cookies?.access_token || null;

export { PRIVATE_KEY };
 