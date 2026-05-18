import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = !email.trim() || !password.trim() || isSubmitting;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Completa email y contrasena para continuar.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      onLoginSuccess();
      setIsSubmitting(false);
      navigate('/');
    }, 700);
  };

  return (
    <section className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Inicia sesion para continuar</h2>
        <p className="login-subtitle">Accede para seguir con tus pedidos favoritos.</p>

        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="login-input"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="input-label" htmlFor="password">
          Contrasena
        </label>
        <input
          id="password"
          className="login-input"
          type="password"
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error ? <p className="form-error">{error}</p> : null}

        <button type="submit" className="submit-btn" disabled={isDisabled}>
          {isSubmitting ? 'Iniciando sesion...' : 'Iniciar sesion'}
        </button>
      </form>
    </section>
  );
}

export default Login;
