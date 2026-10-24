import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import LoginRegistro from '../../src/pages/LoginRegistro.jsx';

describe('Torre Central - Interfaz de inicio de sesión', () => {
  afterEach(() => {
    cleanup();
  });

  // CP-04: el login debe mostrar los controles que el usuario necesita.
  it('CP-04: muestra los campos y el botón de inicio de sesión', () => {
    render(<LoginRegistro />);

    const correo = screen.getByPlaceholderText('admin@torrecentral.cl');
    const contrasena = screen.getByPlaceholderText('••••••••');
    const ingresar = screen.getByRole('button', { name: 'Ingresar al Sistema' });

    expect(correo).toBeTruthy();
    expect(correo.getAttribute('type')).toBe('email');
    expect(contrasena).toBeTruthy();
    expect(contrasena.getAttribute('type')).toBe('password');
    expect(ingresar).toBeTruthy();
  });

  // CP-05: un clic debe cambiar el estado y mostrar el registro.
  it('CP-05: abre el formulario de registro al hacer clic', () => {
    render(<LoginRegistro />);

    const abrirRegistro = screen.getByRole('button', { name: 'Regístrate aquí' });
    fireEvent.click(abrirRegistro);

    expect(screen.getByRole('heading', { name: 'Crear Cuenta' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Registrar Cuenta' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Ingresar al Sistema' })).toBeNull();
  });
});