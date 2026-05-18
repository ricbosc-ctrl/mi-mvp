import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MVP landing headline and login button', () => {
  render(<App />);
  expect(screen.getByText(/el asistente inteligente para pedir mejor/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /iniciar sesion/i })).toBeInTheDocument();
});
