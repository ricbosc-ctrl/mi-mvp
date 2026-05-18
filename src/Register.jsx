import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isDisabled = !name.trim() || !email.trim() || !password.trim() || isSubmitting;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5050/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo completar el registro');
      }

      setSuccessMessage('Usuario registrado correctamente en CouchDB.');
      setName('');
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 900);
    } catch (error) {
      setErrorMessage(error.message || 'Error de conexion con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Crea tu cuenta</h2>
        <p className="login-subtitle">Registro visual para la maqueta MVP.</p>

        <label className="input-label" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          className="login-input"
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label className="input-label" htmlFor="register-email">
          Email
        </label>
        <input
          id="register-email"
          className="login-input"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label className="input-label" htmlFor="register-password">
          Contrasena
        </label>
        <input
          id="register-password"
          className="login-input"
          type="password"
          placeholder="********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        {successMessage ? <p className="form-success">{successMessage}</p> : null}

        <button type="submit" className="submit-btn" disabled={isDisabled}>
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </section>
  );
}

export default Register;
