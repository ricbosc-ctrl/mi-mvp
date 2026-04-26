function App() {
  const handleSearch = () => {
    alert('Buscando comida...');
  };

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #ffffff;
            color: #111111;
          }

          .page {
            min-height: 100vh;
            background: #ffffff;
          }

          .container {
            width: min(1120px, 92%);
            margin: 0 auto;
          }

          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 18px 0;
            border-bottom: 1px solid #f0f0f0;
          }

          .brand {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
          }

          .green {
            color: #06c167;
          }

          .nav-links {
            display: flex;
            gap: 22px;
            color: #1f2937;
            font-size: 0.95rem;
          }

          .login-btn {
            background: #111111;
            color: #ffffff;
            border: none;
            border-radius: 999px;
            padding: 10px 16px;
            font-weight: 600;
            cursor: pointer;
          }

          .hero {
            padding: clamp(40px, 7vw, 90px) 0 28px;
            text-align: left;
          }

          .hero-title {
            margin: 0 0 16px;
            font-size: clamp(2rem, 5vw, 3.5rem);
            line-height: 1.1;
            max-width: 700px;
          }

          .hero-subtitle {
            margin: 0 0 30px;
            max-width: 640px;
            color: #4b5563;
            font-size: clamp(1rem, 2.2vw, 1.2rem);
            line-height: 1.6;
          }

          .search-row {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
          }

          .address-input {
            flex: 1;
            min-width: 240px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            padding: 14px 16px;
            font-size: 1rem;
            outline: none;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
          }

          .cta-btn {
            border: none;
            border-radius: 14px;
            padding: 14px 22px;
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
            background: #06c167;
            box-shadow: 0 10px 20px rgba(6, 193, 103, 0.25);
            cursor: pointer;
          }

          .benefits {
            padding: 24px 0 56px;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 16px;
          }

          .benefit-card {
            background: #ffffff;
            border: 1px solid #f1f1f1;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          }

          .benefit-icon {
            font-size: 1.5rem;
            margin-bottom: 8px;
          }

          .benefit-title {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: #111111;
          }

          @media (max-width: 920px) {
            .benefits {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 700px) {
            .nav-links {
              display: none;
            }

            .benefits {
              grid-template-columns: 1fr;
            }

            .search-row {
              flex-direction: column;
              align-items: stretch;
            }

            .cta-btn {
              width: 100%;
            }
          }
        `}
      </style>

      <main className="page">
        <div className="container">
          <nav className="navbar">
            <h1 className="brand">
              Uber <span className="green">Eats</span>
            </h1>

            <div className="nav-links">
              <span>Explorar</span>
              <span>Restaurantes</span>
              <span>Ofertas</span>
            </div>

            <button type="button" className="login-btn">
              Iniciar sesion
            </button>
          </nav>

          <section className="hero">
            <h2 className="hero-title">
              Pide tu comida <span className="green">favorita</span>
            </h2>
            <p className="hero-subtitle">
              Descubre restaurantes cerca de ti y recibe tu pedido en minutos.
            </p>

            <div className="search-row">
              <input
                className="address-input"
                type="text"
                placeholder="Introduce tu direccion"
              />
              <button type="button" className="cta-btn" onClick={handleSearch}>
                Buscar comida
              </button>
            </div>
          </section>

          <section className="benefits">
            <article className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <p className="benefit-title">Entrega rapida</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon">🍔</div>
              <p className="benefit-title">Miles de restaurantes</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon">📍</div>
              <p className="benefit-title">Seguimiento en tiempo real</p>
            </article>
            <article className="benefit-card">
              <div className="benefit-icon">🔒</div>
              <p className="benefit-title">Pagos seguros</p>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
