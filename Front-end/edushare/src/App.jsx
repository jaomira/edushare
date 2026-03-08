import { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CriarPostagemPage from './pages/CriarPostagemPage';
import { useUsuarios } from './hooks/useUsuarios';
import { usePostagens } from './hooks/usePostagens';
import './App.css';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [usuarioAtual, setUsuarioAtual] = useState(null);

  // Hooks de gerenciamento de dados
  const usuariosHook = useUsuarios();
  const postagensHook = usePostagens();

  // Carregar dados ao montar o componente
  useEffect(() => {
    usuariosHook.listar();
    postagensHook.listar();
  }, []);

  // Navegar entre páginas
  const handleNavigate = (pagina) => {
    setPaginaAtual(pagina);
    if (pagina !== 'criar-postagem') {
      // Recarregar postagens ao voltar para home
      postagensHook.listar();
    }
  };

  // Fazer logout
  const handleLogout = () => {
    setUsuarioAtual(null);
    setPaginaAtual('home');
  };

  // Selecionar usuário (login)
  const handleSelecionarUsuario = (usuario) => {
    setUsuarioAtual(usuario);
    setPaginaAtual('home');
  };

  // Criar novo usuário
  const handleCriarUsuario = async (dados) => {
    const novoUsuario = await usuariosHook.criar(dados);
    setUsuarioAtual(novoUsuario);
    setPaginaAtual('home');
    return novoUsuario;
  };

  // Criar nova postagem
  const handleCriarPostagem = async (dados) => {
    await postagensHook.criar(dados);
    setPaginaAtual('home');
  };

  // Deletar postagem
  const handleDeletarPostagem = async (id) => {
    await postagensHook.deletar(id);
  };

  // Registrar interesse (like)
  const handleToggleLike = async (postagemId, usuarioId) => {
    await postagensHook.toggleLike(postagemId, usuarioId);
  };

  return (
    <div className="app">
      <Header
        usuarioAtual={usuarioAtual}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <main className="app-main">
        {paginaAtual === 'home' && (
          <HomePage
            postagens={postagensHook.postagens}
            carregando={postagensHook.carregando}
            erro={postagensHook.erro}
            usuarioAtual={usuarioAtual}
            onLike={handleToggleLike}
            onDelete={handleDeletarPostagem}
            onErroLimpar={() => postagensHook.listar()}
          />
        )}

        {paginaAtual === 'login' && (
          <LoginPage
            usuarios={usuariosHook.usuarios}
            carregando={usuariosHook.carregando}
            erro={usuariosHook.erro}
            onCriarUsuario={handleCriarUsuario}
            onSelecionarUsuario={handleSelecionarUsuario}
            onErroLimpar={() => usuariosHook.listar()}
          />
        )}

        {paginaAtual === 'criar-postagem' && (
          <CriarPostagemPage
            usuarioAtual={usuarioAtual}
            carregando={postagensHook.carregando}
            erro={postagensHook.erro}
            onCriarPostagem={handleCriarPostagem}
            onErroLimpar={() => postagensHook.listar()}
            onVoltar={() => handleNavigate('home')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
