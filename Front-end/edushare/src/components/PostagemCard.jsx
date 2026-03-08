import '../styles/PostagemCard.css';

const PostagemCard = ({ postagem, usuarioId, onDelete, onLike, usuario_logado = false }) => {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar esta postagem?')) {
      onDelete(postagem.id);
    }
  };

  const handleLike = () => {
    if (!usuario_logado) {
      alert('Por favor, faça login para registrar interesse');
      return;
    }
    onLike(postagem.id, usuarioId);
  };

  return (
    <div className="postagem-card">
      <div className="postagem-header">
        <h3 className="postagem-titulo">{postagem.titulo}</h3>
        <span className={`postagem-tipo ${postagem.tipo?.toLowerCase()}`}>
          {postagem.tipo}
        </span>
      </div>

      <div className="postagem-info">
        <p className="postagem-descricao">{postagem.descricao}</p>
        <div className="postagem-meta">
          <span className="meta-item">
            <strong>Localidade:</strong> {postagem.localidade}
          </span>
          {postagem.valor && (
            <span className="meta-item">
              <strong>Valor:</strong> R$ {parseFloat(postagem.valor).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="postagem-dono">
        <p>
          <strong>Anunciante:</strong> {postagem.dono}
        </p>
        <p>
          <strong>Telefone:</strong> {postagem.telefone}
        </p>
      </div>

      <div className="postagem-footer">
        <button
          className="btn-like"
          onClick={handleLike}
          title="Registrar interesse neste item"
        >
          ❤️ {postagem.total_likes || 0}
        </button>

        {usuario_logado && usuarioId === postagem.usuario_id && (
          <button className="btn-delete" onClick={handleDelete}>
            Deletar
          </button>
        )}
      </div>
    </div>
  );
};

export default PostagemCard;
