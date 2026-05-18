import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Chat from './Chat';

function LandingPage({ isLoggedIn, onPrimaryCta, onSecondaryCta, onFinalCta, onRegisterClick }) {
  const handleHeroCta = () => {
    onPrimaryCta();
  };

  return (
    <>
      <section id="inicio" className="hero">
        <p className="hero-eyebrow">Uber Eats Smart Assistant</p>
        <h2 className="hero-title">El asistente inteligente para pedir mejor</h2>
        <p className="hero-subtitle">
          Recomienda comida, resuelve dudas y mejora la experiencia del usuario en segundos.
        </p>

        <div className="hero-actions">
          <button type="button" className="cta-btn" onClick={handleHeroCta}>
            Probar asistente
          </button>
          <button type="button" className="ghost-btn" onClick={onSecondaryCta}>
            Ver beneficios
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="hero-auth-actions">
            <button type="button" className="secondary-pill-btn" onClick={onRegisterClick}>
              Registrarse
            </button>
          </div>
        ) : (
          <p className="welcome-message">Bienvenido, usuario</p>
        )}
      </section>

      <section id="producto" className="section-card">
        <h3 className="section-title">Que es Uber Eats Smart Assistant</h3>
        <p className="section-text">
          Uber Eats Smart Assistant es un MVP basado en IA simulada que ayuda a los usuarios a decidir que pedir y
          a resolver dudas frecuentes sobre pedidos, pagos o recomendaciones.
        </p>
        <p className="section-text">
          Esta propuesta reduce la indecision al elegir comida, ofrece soporte automatico y mejora la experiencia del
          usuario en todo el flujo de pedido.
        </p>
      </section>

      <section className="section-block">
        <h3 className="section-title">Como funciona</h3>
        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">1</span>
            <p className="step-text">El usuario escribe una preferencia o duda</p>
          </article>
          <article className="step-card">
            <span className="step-number">2</span>
            <p className="step-text">El asistente analiza el mensaje</p>
          </article>
          <article className="step-card">
            <span className="step-number">3</span>
            <p className="step-text">Devuelve una recomendacion o respuesta automatica</p>
          </article>
        </div>
      </section>

      <section id="beneficios" className="section-block">
        <h3 className="section-title">Beneficios principales</h3>
        <div className="benefits">
          <article className="benefit-card">
            <h4 className="benefit-title">Ahorro de tiempo</h4>
            <p className="benefit-text">Respuestas y sugerencias en segundos para decidir mas rapido.</p>
          </article>
          <article className="benefit-card">
            <h4 className="benefit-title">Mejor experiencia de usuario</h4>
            <p className="benefit-text">Menos friccion durante el pedido con ayuda contextual simple.</p>
          </article>
          <article className="benefit-card">
            <h4 className="benefit-title">Soporte automatico</h4>
            <p className="benefit-text">Atiende dudas frecuentes sin depender siempre de soporte humano.</p>
          </article>
          <article className="benefit-card">
            <h4 className="benefit-title">Recomendaciones personalizadas</h4>
            <p className="benefit-text">Sugiere opciones segun gustos y necesidad del usuario.</p>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <h3 className="final-cta-title">Listo para probar el asistente?</h3>
        <button type="button" className="cta-btn" onClick={onFinalCta}>
          Empezar ahora
        </button>
      </section>
    </>
  );
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  const goToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isDashboardPage = location.pathname === '/dashboard';
  const isChatPage = location.pathname === '/chat';
  const hideMainNavbar = isDashboardPage || isChatPage;

  return (
    <main className="page">
      <div className="container">
        {!hideMainNavbar && (
        <nav className="navbar">
          <button type="button" className="brand-btn" onClick={() => navigate('/')}>
            <span className="brand">
              Uber <span className="green">Eats</span>
            </span>
          </button>

          <div className="nav-links">
            <button type="button" className="nav-link-btn" onClick={() => goToSection('inicio')}>
              Inicio
            </button>
            <button type="button" className="nav-link-btn" onClick={() => goToSection('producto')}>
              Producto
            </button>
            <button type="button" className="nav-link-btn" onClick={() => goToSection('beneficios')}>
              Beneficios
            </button>
            <button type="button" className="nav-link-btn" onClick={() => navigate('/chat')}>
              Asistente
            </button>
            <button type="button" className="nav-link-btn" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>

          {!isLoggedIn ? (
            <div className="auth-actions">
              <button type="button" className="register-btn" onClick={() => navigate('/register')}>
                Registrarse
              </button>
              <button type="button" className="login-btn" onClick={() => navigate('/login')}>
                Iniciar sesion
              </button>
            </div>
          ) : (
            <div className="account-actions">
              <button type="button" className="account-btn" onClick={() => navigate('/')}>
                Mi cuenta
              </button>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Cerrar sesion
              </button>
            </div>
          )}
        </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isLoggedIn={isLoggedIn}
                onPrimaryCta={() => navigate('/chat')}
                onSecondaryCta={() => goToSection('beneficios')}
                onFinalCta={() => navigate('/chat')}
                onRegisterClick={() => navigate('/register')}
              />
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLoginSuccess={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/chat" element={<Chat onBack={() => navigate('/')} />} />
          <Route path="*" element={<Navigate to={isLoginPage || isRegisterPage ? '/login' : '/'} replace />} />
        </Routes>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
