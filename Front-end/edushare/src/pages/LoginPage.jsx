import { useState, useEffect } from 'react';
import UsuarioForm from '../components/UsuarioForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/LoginPage.css';

const LoginPage = ({ usuarios, carregando, erro, onCriarUsuario, onSelecionarUsuario, onErroLimpar }) => {
  const [fazendoLogin, setFazendoLogin] = useState(false);
  const [erroLocal, setErroLocal] = useState('');

  if (carregando) return <LoadingSpinner mensagem="Carregando..." />;

  const handleSelecionarUsuario = (usuario) => {
    setErroLocal('');
    onSelecionarUsuario(usuario);
  };

  const handleCriarUsuario = async (dados) => {
    setFazendoLogin(true);
    try {
      const novoUsuario = await onCriarUsuario(dados);
      setFazendoLogin(false);
    } catch (err) {
      setErroLocal(err.message);
      setFazendoLogin(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-section">
          <h2>Criar Nova Conta</h2>
          <UsuarioForm onSubmit={handleCriarUsuario} carregando={fazendoLogin} />
        </div>

        <div className="divider">OU</div>

        <div className="login-section">
          <h2>Entrar com Conta Existente</h2>
          {erro && <ErrorMessage mensagem={erro} onDismiss={onErroLimpar} />}
          {erroLocal && <ErrorMessage mensagem={erroLocal} onDismiss={() => setErroLocal('')} />}

          {usuarios.length === 0 ? (
            <p className="no-users">Nenhum usuário cadastrado ainda. Crie uma nova conta.</p>
          ) : (
            <div className="usuarios-list">
              {usuarios.map((usuario) => (
                <div key={usuario.id} className="usuario-item">
                  <div className="usuario-details">
                    <h3>{usuario.nome}</h3>
                    <p>{usuario.telefone}</p>
                  </div>
                  <button
                    className="btn-select"
                    onClick={() => handleSelecionarUsuario(usuario)}
                  >
                    Entrar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
