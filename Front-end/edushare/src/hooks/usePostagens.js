import { useState, useCallback } from 'react';
import { postagensService } from '../services/api';

export const usePostagens = () => {
  const [postagens, setPostagens] = useState([]);
  const [postagemAtual, setPostagemAtual] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const listar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await postagensService.listar();
      setPostagens(dados);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  const obter = useCallback(async (id) => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await postagensService.obter(id);
      setPostagemAtual(dados);
      return dados;
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  const criar = useCallback(async (dados) => {
    setCarregando(true);
    setErro(null);
    try {
      const novaPostagem = await postagensService.criar(dados);
      setPostagens((prev) => [novaPostagem, ...prev]);
      return novaPostagem;
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, []);

  const deletar = useCallback(async (id) => {
    setCarregando(true);
    setErro(null);
    try {
      await postagensService.deletar(id);
      setPostagens((prev) => prev.filter((p) => p.id !== id));
      if (postagemAtual?.id === id) setPostagemAtual(null);
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, [postagemAtual]);

  const toggleLike = useCallback(async (postagemId, usuarioId) => {
    setErro(null);
    try {
      await postagensService.toggleLike(postagemId, usuarioId);
      // Recarregar a postagem para atualizar contagem de likes
      await listar();
    } catch (err) {
      setErro(err.message);
      throw err;
    }
  }, [listar]);

  return {
    postagens,
    postagemAtual,
    carregando,
    erro,
    listar,
    obter,
    criar,
    deletar,
    toggleLike,
  };
};
