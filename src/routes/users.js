import { Router } from 'express';
import UserController from '../controllers/user-controller.js';

// Crea un router para manejar las rutas.
const usersRouter = Router();

// Ejecuta una función del controlador de usuario dependiendo
// de la url dentro de /users a la que se intente acceder.
//
// Si añadimos los paréntesis en las funciones estas
// se ejecutarán inmediatamente al registrarse la ruta,
// cosa que no queremos.
//
// Al pasarle la función por referencia (sin paréntesis),
// Express solo las utilizará cuando sea necesario,
// es decir, cuando reciba una petición HTTP.
usersRouter.get('/', UserController.getAllUsers);
usersRouter.post('/', UserController.createUser);

usersRouter.get('/:id', UserController.getUserById);
usersRouter.patch('/:id', UserController.updateUser);
usersRouter.delete('/:id', UserController.deleteUser);

export { usersRouter };
