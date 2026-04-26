import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page title and button', () => {
  render(<App />);
  expect(screen.getByText(/mi primera pagina en react/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /haz clic aqui/i })
  ).toBeInTheDocument();
});
