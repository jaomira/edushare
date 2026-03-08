import PostagemForm from '../components/PostagemForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/CriarPostagemPage.css';

const CriarPostagemPage = ({ usuarioAtual, carregando, erro, onCriarPostagem, onErroLimpar, onVoltar }) => {
  if (!usuarioAtual) {
    return (
      <div className="criar-postagem-page">
        <ErrorMessage mensagem="Você precisa estar logado para criar uma postagem" />
      </div>
    );
  }

  if (carregando) return <LoadingSpinner mensagem="Criando postagem..." />;

  return (
    <div className="criar-postagem-page">
      <div className="page-header">
        <button className="btn-voltar" onClick={onVoltar}>
          Voltar
        </button>
        <h1>Compartilhar Material</h1>
      </div>

      {erro && (
        <ErrorMessage mensagem={erro} onDismiss={onErroLimpar} />
      )}

      <PostagemForm
        usuarioId={usuarioAtual.id}
        onSubmit={onCriarPostagem}
        carregando={carregando}
      />
    </div>
  );
};

export default CriarPostagemPage;
