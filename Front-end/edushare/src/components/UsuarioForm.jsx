import { useState } from 'react';
import '../styles/UsuarioForm.css';

const UsuarioForm = ({ onSubmit, carregando = false }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    data_nascimento: '',
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

    if (!formData.nome.trim() || !formData.telefone.trim() || !formData.data_nascimento) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    try {
      await onSubmit(formData);
      // Limpar formulário após sucesso
      setFormData({
        nome: '',
        telefone: '',
        data_nascimento: '',
      });
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="usuario-form-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit} className="usuario-form">
        <div className="form-group">
          <label htmlFor="nome">Nome Completo *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone *</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Ex: (11) 99999-9999"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="data_nascimento">Data de Nascimento *</label>
          <input
            type="date"
            id="data_nascimento"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
        </div>

        {erro && <div className="form-error">{erro}</div>}

        <button type="submit" className="btn-submit" disabled={carregando}>
          {carregando ? 'Criando...' : 'Criar Conta'}
        </button>
      </form>
    </div>
  );
};

export default UsuarioForm;
