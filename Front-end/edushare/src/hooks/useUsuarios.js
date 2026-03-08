import { useState, useCallback } from 'react';
import { usuariosService } from '../services/api';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtual, setUsuarioAtual] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const listar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const dados = await usuariosService.listar();
      setUsuarios(dados);
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
      const dados = await usuariosService.obter(id);
      setUsuarioAtual(dados);
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
      const novoUsuario = await usuariosService.criar(dados);
      setUsuarios((prev) => [...prev, novoUsuario]);
      setUsuarioAtual(novoUsuario);
      return novoUsuario;
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
      await usuariosService.deletar(id);
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      if (usuarioAtual?.id === id) setUsuarioAtual(null);
    } catch (err) {
      setErro(err.message);
      throw err;
    } finally {
      setCarregando(false);
    }
  }, [usuarioAtual]);

  return {
    usuarios,
    usuarioAtual,
    carregando,
    erro,
    listar,
    obter,
    criar,
    deletar,
  };
};
