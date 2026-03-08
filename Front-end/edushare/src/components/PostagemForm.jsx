import { useState } from 'react';
import '../styles/PostagemForm.css';

const PostagemForm = ({ usuarioId, onSubmit, carregando = false }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'Venda',
    descricao: '',
    localidade: '',
    valor: '',
  });

  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErro('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo.trim() || !formData.descricao.trim() || !formData.localidade.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      await onSubmit({
        usuario_id: usuarioId,
        ...formData,
        valor: formData.valor ? parseFloat(formData.valor) : null,
      });

      // Limpar formulário após sucesso
      setFormData({
        titulo: '',
        tipo: 'Venda',
        descricao: '',
        localidade: '',
        valor: '',
      });
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="postagem-form-container">
      <h2>Criar Nova Postagem</h2>
      <form onSubmit={handleSubmit} className="postagem-form">
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: Livro de JavaScript"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipo">Tipo *</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="Venda">Venda</option>
            <option value="Doação">Doação</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição *</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descreva o item em detalhes"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="localidade">Localidade *</label>
          <input
            type="text"
            id="localidade"
            name="localidade"
            value={formData.localidade}
            onChange={handleChange}
            placeholder="Ex: Centro, São Paulo - SP"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="valor">Valor (R$)</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        {erro && <div className="form-error">{erro}</div>}

        <button type="submit" className="btn-submit" disabled={carregando}>
          {carregando ? 'Criando...' : 'Criar Postagem'}
        </button>
      </form>
    </div>
  );
};

export default PostagemForm;
