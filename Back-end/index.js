import express from 'express';
import cors from 'cors';
import { query } from './db.js';
const app = express();

app.use(cors());

app.use(express.json());

// 1. Rota de Teste
app.get('/', (req, res) => res.send('API Rodando!'));

// 2. Cadastro de Usuário
app.post('/usuarios', async (req, res) => {
    const { nome, telefone, data_nascimento } = req.body;
    try {
        const result = await query(
            'INSERT INTO usuarios (nome, telefone, data_nascimento) VALUES ($1, $2, $3) RETURNING *',
            [nome, telefone, data_nascimento]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const result = await query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Listar Postagens (Mural estilo OLX)
app.get('/postagens', async (req, res) => {
    try {
        // 1. Mudamos o nome da variável para 'sql'
        const sql = `
            SELECT p.*, u.nome as dono, u.telefone,
            (SELECT COUNT(*) FROM likes l WHERE l.postagem_id = p.id) as total_likes
            FROM postagens p
            JOIN usuarios u ON p.usuario_id = u.id
            ORDER BY p.data_criacao DESC`;

        // 2. Agora chamamos a FUNÇÃO query (importada do db.js) passando a string 'sql'
        const result = await query(sql); 
        
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/postagens/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT p.*, u.nome as dono, u.telefone,
            (SELECT COUNT(*) FROM likes l WHERE l.postagem_id = p.id) as total_likes
            FROM postagens p
            JOIN usuarios u ON p.usuario_id = u.id
            WHERE p.id = $1`;
        const result = await query(sql, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Postagem não encontrada' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.delete('/postagens/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM postagens WHERE id = $1', [id]);
        res.json({ message: 'Postagem deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Criar Postagem (Anúncio)
app.post('/postagens', async (req, res) => {
    let { usuario_id, titulo, tipo, descricao, localidade, valor } = req.body;

    // Limpeza de emergência para o Hackathon
    if (tipo) tipo = tipo.trim(); 

    try {
        const result = await query(
            'INSERT INTO postagens (usuario_id, titulo, tipo, descricao, localidade, valor) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [usuario_id, titulo, tipo, descricao, localidade, valor]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        // Log para você debugar no terminal o erro real do Postgres
        console.error("Erro do Postgres:", err.message); 
        res.status(400).json({ error: "Erro ao postar. Verifique se o tipo é 'Venda' ou 'Doação'." });
    }
});

// 5. Curtir/Descurtir Postagem
app.post('/postagens/:id/like', async (req, res) => {
    const { id } = req.params; 
    const { usuario_id } = req.body;  

    try {
        // Tenta inserir o like. Se já existir, o UNIQUE do banco causará erro.
        await query('INSERT INTO likes (usuario_id, postagem_id) VALUES ($1, $2)', [usuario_id, id]);
        res.status(201).json({ message: "Interesse registrado! ❤️" });
    } catch (err) {
        if (err.code === '23505') {
            // Se o usuário clicar de novo, removemos o like (Toggle)
            await query('DELETE FROM likes WHERE usuario_id = $1 AND postagem_id = $2', [usuario_id, id]);
            return res.json({ message: "Interesse removido." });
        }
        res.status(500).json({ error: "Erro ao processar interesse." });
    }
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));