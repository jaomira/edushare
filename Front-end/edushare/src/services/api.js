const API_URL = 'http://localhost:3001';

export const usuariosService = {
  // Listar todos os usuários
  listar: async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) throw new Error('Erro ao listar usuários');
    return response.json();
  },

  // Obter usuário por ID
  obter: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`);
    if (!response.ok) throw new Error('Usuário não encontrado');
    return response.json();
  },

  // Criar novo usuário
  criar: async (dados) => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error('Erro ao criar usuário');
    return response.json();
  },

  // Deletar usuário
  deletar: async (id) => {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
    return response.json();
  },
};

export const postagensService = {
  // Listar todas as postagens
  listar: async () => {
    const response = await fetch(`${API_URL}/postagens`);
    if (!response.ok) throw new Error('Erro ao listar postagens');
    return response.json();
  },

  // Obter postagem por ID
  obter: async (id) => {
    const response = await fetch(`${API_URL}/postagens/${id}`);
    if (!response.ok) throw new Error('Postagem não encontrada');
    return response.json();
  },

  // Criar nova postagem
  criar: async (dados) => {
    const response = await fetch(`${API_URL}/postagens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) throw new Error('Erro ao criar postagem');
    return response.json();
  },

  // Deletar postagem
  deletar: async (id) => {
    const response = await fetch(`${API_URL}/postagens/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar postagem');
    return response.json();
  },

  // Like/Unlike postagem
  toggleLike: async (postagemId, usuarioId) => {
    const response = await fetch(`${API_URL}/postagens/${postagemId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario_id: usuarioId }),
    });
    if (!response.ok) throw new Error('Erro ao registrar interesse');
    return response.json();
  },
};
