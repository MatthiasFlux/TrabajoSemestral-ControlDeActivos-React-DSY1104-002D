import React from 'react';
import { Button } from 'react-bootstrap';

export default function Boton({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  size
}) {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      className={`fw-bold ${className}`}
      disabled={disabled}
      size={size}
    >
      {children}
    </Button>
  );
}