import User from '../models/User.js';
import { userSchema, partialUserSchema } from './../validations/user-schema.js';
import { z } from 'zod';

class UserController {
  static async getAllUsers(req, res) {
    try {
      // Almacena los datos obtenidos a través
      // de la función del modelo.
      const users = await User.getAll();

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching users' });
    }
  }

  static async getUserById(req, res) {
    // Obtiene la id de la url de la petición.
    const { id } = req.params;

    try {
      // Almacena los datos obtenidos a través
      // de la función del modelo.
      //
      // Con JavaScript hay que comprobar si la id te
      // llega en forma de string, porque eso a prisma
      // no le gusta y va a dar error.
      const user = await User.getById(Number(id));

      // Si no se obtiene ninguna información devolverá
      // un error 404 (not found).
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching user' });
    }
  }

  static async createUser(req, res) {
    // Obtiene los datos del cuerpo de la petición.
    const data = req.body;

    try {
      // Utiliza el schema de user para validar los datos.
      const validatedData = userSchema.parse(data);
      // Almacena los datos obtenidos a través
      // de la función del modelo.
      const user = await User.create(validatedData);

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);

      // Si el error proviene de zod, es decir, de las validaciones,
      // va a enviar un código 400 (bad request) con el mensaje de error.
      if (error instanceof z.ZodError) {
        // Modifica la estructura de los errores de zod
        // para que muestre los mensajes adecuadamente.
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ error: 'Error creating user' });
    }
  }

  static async updateUser(req, res) {
    // Obtiene la id de la url de la petición.
    const { id } = req.params;
    // Obtiene los datos del cuerpo de la petición.
    const data = req.body;

    try {
      // Utiliza el schema de user para validar los datos.
      const validatedData = partialUserSchema.parse(data);
      // Almacena los datos obtenidos a través
      // de la función del modelo.
      //
      // Con JavaScript hay que comprobar si la id te
      // llega en forma de string, porque eso a prisma
      // no le gusta y va a dar error.
      const user = await User.update(Number(id), validatedData);

      // Si no se obtiene ninguna información devolverá
      // un error 404 (not found).
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);

      // Si el error proviene de zod, es decir, de las validaciones,
      // va a enviar un código 400 (bad request) con el mensaje de error.
      if (error instanceof z.ZodError) {
        // Modifica la estructura de los errores de zod
        // para que muestre los mensajes adecuadamente.
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ error: 'Error updating user' });
    }
  }

  static async deleteUser(req, res) {
    // Obtiene la id de la url de la petición.
    const { id } = req.params;

    try {
      // Almacena los datos obtenidos a través
      // de la función del modelo.
      //
      // Con JavaScript hay que comprobar si la id te
      // llega en forma de string, porque eso a prisma
      // no le gusta y va a dar error.
      const user = await User.delete(Number(id));

      // Si no se obtiene ninguna información devolverá
      // un error 404 (not found).
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error deleting user' });
    }
  }
}

export default UserController;
