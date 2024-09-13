import express from 'express';
import { usersRouter } from './routes/users.js';

// Crea el servidor de express.
const app = express();
// Especifica el puerto, que por defecto será 3000
// o el que se especifique en un .env.
//
// Nota: La variable de entorno se pone en mayúscula.
const PORT = process.env.PORT || 3000;

// Desactiva la cabecera powered-by de express,
// esto te ahorra unos cuantos bytes y soluciona
// un pequeño problema de seguridad.
app.disable('x-powered-by');

// Middleware que analiza el cuerpo de las peticiones HTTP
// que tienen la cabecera 'Content-Type: application/json',
// toma esos datos y los convierte en un objeto JavaScript
// accesible desde req.body.
//
// Sin este middleware, req.body estaría vacío y no se podrá
// acceder a los datos enviados.
app.use(express.json());

// Cuando se acceda a /users se van a cargar
// las rutas de usersRouter.
app.use('/users', usersRouter);

// Escucha la conexión en el puerto especificado.
app.listen(PORT, () => {
  console.log(`+ Server running on http://localhost:${PORT}`);
});

// Explicación de la arquitectura de la app:
//
// 1. La aplicación, es decir, index.js accederá a las rutas de usuario
// si se intenta acceder a ellas desde la web.
//
// 2. Las rutas de usuario llamarán a una función del controlador
// de usuario dependiendo de la url.
//
// 3. El controlador manejará los datos de la petición a través
// de una función del modelo de usuario y devolverá una respuesta.
//
// 4. El modelo maneja la información de la petición, recuperándola
// de la base de datos, insertando nueva información, etc...
// y la devuelve para que el controlador pueda devolverla
// en forma de respuesta.
