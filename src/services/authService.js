import { usuariosIniciales } from "../data/usuarios";

export const authService = {
  login: (correo, pass, usuarios = usuariosIniciales) => {
    const correoLimpio = correo.trim().toLowerCase();
    const usuario = usuarios.find(
      (u) => u.correo === correoLimpio && u.pass === pass
    );

    if (!usuario) {
      return { ok: false, mensaje: "Credenciales incorrectas." };
    }

    if (
      usuario.rol !== "Arrendatario" &&
      usuario.rol !== "Jefe de Mantenimiento" &&
      usuario.rol !== "Jefe Mantenimiento" &&
      usuario.rol !== "Administrador"
    ) {
      return { ok: false, mensaje: "Este rol todavía no tiene una vista asociada." };
    }

    return { ok: true, usuario };
  }
};