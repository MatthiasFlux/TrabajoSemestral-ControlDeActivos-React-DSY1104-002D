import { authService } from '../../src/services/authService.js';

describe('Torre Central - Autenticación', () => {
  // Prueba 1: credenciales correctas del jefe de mantenimiento.
  it('CP-01: permite iniciar sesión con credenciales válidas', () => {
    const resultado = authService.login('jefe@torrecentral.cl', '123456');

    expect(resultado.ok).toBe(true);
    expect(resultado.usuario.nombre).toBe('Roberto Gómez');
    expect(resultado.usuario.rol).toBe('Jefe de Mantenimiento');
  });

  // Prueba 2: contraseña equivocada, manteniendo el mismo correo.
  it('CP-02: rechaza una contraseña incorrecta', () => {
    const resultado = authService.login('jefe@torrecentral.cl', 'incorrecta');

    expect(resultado.ok).toBe(false);
    expect(resultado.mensaje).toBe('Credenciales incorrectas.');
    expect(resultado.usuario).toBeUndefined();
  });

  // Prueba 3: un técnico de prueba tiene credenciales correctas,
  // pero la aplicación aún no dispone de una vista para ese rol.
  it('CP-03: rechaza un rol que todavía no tiene vista habilitada', () => {
    const usuariosPrueba = [
      {
        correo: 'tecnico@torrecentral.cl',
        pass: '123456',
        nombre: 'Carlos Pérez',
        rol: 'Técnico de Mantenimiento',
      },
    ];

    const resultado = authService.login(
      'tecnico@torrecentral.cl',
      '123456',
      usuariosPrueba
    );

    expect(resultado.ok).toBe(false);
    expect(resultado.mensaje).toBe(
      'Este rol todavía no tiene una vista asociada.'
    );
  });
});
