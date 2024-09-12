import { z } from 'zod';

// Esquema de validación para el usuario.
export const userSchema = z.object({
  name: z.string().min(3, 'The name must be at least 3 characters long'),
  email: z.string().email('The email is invalid'),
  password: z
    .string()
    .min(8, 'The password must be at least 8 characters long'),
});

// Esquema de validación parcial para
// la actualización de un usuario.
export const partialUserSchema = userSchema.partial();
