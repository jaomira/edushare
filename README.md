# 📚 EduShare

> Plataforma de compartilhamento de materiais educacionais desenvolvida durante o Hackathon IntegraSi.

O **EduShare** conecta estudantes que desejam doar ou vender materiais didáticos, livros e equipamentos escolares. O projeto consiste em uma API RESTful e uma interface Front-end moderna e responsiva.

## 🚀 Tecnologias Utilizadas

### Front-end

- **React** (Vite)
- **CSS Modules** (Design System customizado)
- **Hooks** para gerenciamento de estado

### Back-end

- **Node.js**
- **Express**
- **PostgreSQL** (Banco de dados)
- **CORS**

## ✨ Funcionalidades

- **Mural de Postagens:** Visualização de itens para doação ou venda (estilo OLX).
- **Interação:** Sistema de "Likes" para demonstrar interesse em um item.
- **Gerenciamento de Usuários:** Cadastro e Login (simulado via seleção de usuário).
- **Gerenciamento de Anúncios:**
  - Criar anúncios com título, descrição, localidade e valor.
  - Excluir anúncios (apenas o dono da postagem).
- **Filtros:** Distinção visual entre itens de "Venda" e "Doação".

## 📦 Estrutura do Projeto

```
edushare/
├── Back-end/          # API Node.js e conexão com Banco de Dados
└── Front-end/         # Aplicação React + Vite
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- PostgreSQL instalado e rodando.

### 1. Configuração do Banco de Dados

Crie um banco de dados no PostgreSQL e execute o seguinte script SQL para criar as tabelas necessárias:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(50),
    data_nascimento DATE
);

CREATE TABLE postagens (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50), -- 'Venda' ou 'Doação'
    descricao TEXT,
    localidade VARCHAR(255),
    valor DECIMAL(10, 2),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    postagem_id INTEGER REFERENCES postagens(id) ON DELETE CASCADE,
    PRIMARY KEY (usuario_id, postagem_id)
);
```

_Nota: Certifique-se de configurar as credenciais do banco no arquivo `Back-end/db.js` (não incluído no repositório por segurança, mas necessário para rodar)._

### 2. Executando o Back-end

Navegue até a pasta do servidor:

```bash
cd Back-end
npm install
npm start
```

O servidor rodará em `http://localhost:3001`.

### 3. Executando o Front-end

Em um novo terminal, navegue até a pasta do front-end:

```bash
cd Front-end/edushare
npm install
npm run dev
```

A aplicação estará disponível (geralmente) em `http://localhost:5173`.

## 🔌 Endpoints da API

| Método   | Rota                  | Descrição                                      |
| -------- | --------------------- | ---------------------------------------------- |
| `GET`    | `/usuarios`           | Lista todos os usuários                        |
| `POST`   | `/usuarios`           | Cria um novo usuário                           |
| `GET`    | `/postagens`          | Lista todas as postagens com contagem de likes |
| `POST`   | `/postagens`          | Cria uma nova postagem                         |
| `DELETE` | `/postagens/:id`      | Deleta uma postagem                            |
| `POST`   | `/postagens/:id/like` | Dá like/deslike em uma postagem                |

## 📱 Telas

O sistema possui as seguintes telas principais:

1. **Home:** Feed de anúncios.
2. **Login/Cadastro:** Entrada simplificada.
3. **Criar Postagem:** Formulário para novos itens.

## 🤝 Contribuição

Projeto desenvolvido para fins acadêmicos/hackathon. Sinta-se à vontade para fazer um fork e contribuir!

---

**Desenvolvido com 💜 pela equipe EduShare**
