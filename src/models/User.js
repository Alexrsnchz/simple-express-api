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
  //
  // Prisma devuelve un error si delete falla
  // en vez de un null, por eso, hay que comprobar
  // si el error que devuelve es el P2025 en cuyo
  // caso hay que hacer que devuelva null para
  // para que salte el error 404 como que no
  // ha encontrado el registro.
  static async delete(id) {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }

      throw error;
    }
  }
}

export default User;
