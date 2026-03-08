import { useEffect } from 'react';
import PostagemCard from '../components/PostagemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/HomePage.css';

const HomePage = ({ postagens, carregando, erro, usuarioAtual, onLike, onDelete, onErroLimpar }) => {
  useEffect(() => {
    // Página Home - listar postagens
  }, []);

  if (carregando) return <LoadingSpinner mensagem="Carregando postagens..." />;

  return (
    <div className="home-page">
        
      <div className="home-hero">
        <h2>Bem-vindo ao EduShare!</h2>
        <p>Aqui você pode compartilhar, vender ou doar seus materiais educacionais</p>
      </div>

      {erro && (
        <ErrorMessage mensagem={erro} onDismiss={onErroLimpar} />
      )}

      <div className="postagens-container">
        {postagens.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma postagem ainda. Seja o primeiro a compartilhar!</p>
          </div>
        ) : (
          <div className="postagens-grid">
            {postagens.map((postagem) => (
              <PostagemCard
                key={postagem.id}
                postagem={postagem}
                usuarioId={usuarioAtual?.id}
                onDelete={onDelete}
                onLike={onLike}
                usuario_logado={!!usuarioAtual}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
