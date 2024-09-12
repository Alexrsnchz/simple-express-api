import prisma from '../../prisma.js';

class User {
  // Devuelve todos los usuarios almacenados
  // en la base de datos.
  static async getAll() {
    return prisma.user.findMany();
  }

  // Devuelve el usuario con la id especificada.
  static async getById(id) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  // Crea y devuelve el usuario con los datos
  // introducidos por parámetro.
  static async create(data) {
    return prisma.user.create({
      data: data,
    });
  }

  // Actualiza y devuelve el usuario con la id
  // y los datos introducidos por parámetro.
  static async update(id, data) {
    return prisma.user.update({
      where: { id },
      data: data,
    });
  }

  // Elimina y devuelve el usuario con la
  // id especificada.
  static async delete(id) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default User;
