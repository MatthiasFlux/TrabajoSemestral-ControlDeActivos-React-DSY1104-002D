import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Boton from '../../src/components/Boton.jsx';

describe('Torre Central - Componente Boton', () => {
  afterEach(() => {
    cleanup();
  });

  // CP-06: el componente debe respetar sus props y ejecutar onClick.
  it('CP-06: muestra el texto y llama al evento al presionarlo', () => {
    const manejarClick = vi.fn();

    render(
      <Boton variant="primary" onClick={manejarClick}>
        Guardar
      </Boton>
    );

    const boton = screen.getByRole('button', { name: 'Guardar' });
    expect(boton).toBeTruthy();
    expect(boton.classList.contains('btn-primary')).toBe(true);

    fireEvent.click(boton);
    expect(manejarClick).toHaveBeenCalledTimes(1);
  });
});
