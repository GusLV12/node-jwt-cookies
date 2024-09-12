export class Validation {
  static username (username) {
    // Validar username
    if (typeof username !== 'string') throw new Error('Nombre de usuario debe ser tipo texto');
    if (username.length < 3) throw new Error('Debe ser minimo de 4 caracteres');
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('La contraseña es inavalida');
    if (password.length < 6) throw new Error('La contraseña es muy corta');
  }
}
