import '../styles/Header.css';
import logoImg from '../assets/EduShare-logo.png';

const Header = ({ usuarioAtual, onLogout, onNavigate }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-logo-container" onClick={() => onNavigate('home')}>
            <img src={logoImg} alt="EduShare Logo" className="brand-logo" />
            <h1 className="brand-title">EduShare</h1>
          </div>
          <p className="brand-subtitle"></p>
        </div>

        <nav className="header-nav">
          <button
            className="nav-button"
            onClick={() => onNavigate('home')}
            title="Ir para Home"
          >
            Home
          </button>

          {usuarioAtual ? (
            <>
              <button
                className="nav-button"
                onClick={() => onNavigate('criar-postagem')}
                title="Criar nova postagem"
              >
                ➕ Novo Anúncio
              </button>
              <div className="user-info">
                <span className="user-name">👤 {usuarioAtual.nome}</span>
                <button className="btn-logout" onClick={onLogout}>
                  Sair
                </button>
              </div>
            </>
          ) : (
            <button
              className="nav-button btn-login"
              onClick={() => onNavigate('login')}
            >
              Entrar/Cadastrar
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
