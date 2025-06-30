# Entrega N°1 - Curso Backend 2

## Descripción

Proyecto de ecommerce con implementación de CRUD de usuarios y sistema de autenticación y autorización usando Passport y JWT.

## Requerimientos cumplidos

- Modelo de usuario `User` con los campos:
  - `first_name`: String
  - `last_name`: String
  - `email`: String (único)
  - `age`: Number
  - `password`: String (hash con bcrypt)
  - `cart`: Referencia a Carts
  - `role`: String (por defecto: `USER`)
- Encriptación de contraseñas usando `bcrypt.hashSync`.
- Estrategias de Passport:
  - Registro con `passport-local`
  - Login con `passport-local`
  - Autenticación con JWT (`passport-jwt`)
- Generación y validación de JWT.
- Ruta `/session/current` que devuelve los datos del usuario autenticado a partir del token.

## Instalación

```bash
git clone https://github.com/tuUsuario/tuRepo.git
cd tuRepo
npm install


## Variables de entorno

Crear un archivo .env en la raíz con:
PORT=8080
MONGO_URI=<tu_string_de_conexion_mongo>
SECRET=<tu_clave_privada>

## Comandos

npm start Inicia el servidor.
npm run dev Inicia el servidor con nodemon.

## Endpoints principales
POST /session/register Registro de usuario.
POST /session/login Login de usuario (retorna cookie con JWT).
GET /session/current Devuelve datos del usuario autenticado.


##Estructura de archivos
.
├── .env
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── modules
    │   └── user.model.js
    ├── passport
    │   └── index.js
    ├── routes
    │   └── session.router.js
    ├── server.js
    ├── utils.js
    └── views
        ├── layouts
        │   └── main.handlebars
        ├── login.handlebars
        ├── partials
        │   └── header.handlebars
        ├── profile.handlebars
        └── register.handlebars


## Dependencias
- express
- mongoose
- passport
- passport-local
- passport-jwt
- bcrypt
- jsonwebtoken
- dotenv
- cookie-parser

## Notas
* No subir node_modules al repositorio.
*Asegurarse de que el archivo .env no se suba.
*Probar las rutas con Postman o un cliente HTTP.