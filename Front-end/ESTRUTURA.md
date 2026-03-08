# 📚 EduShare - Frontend

Frontend componentizado da aplicação EduShare, desenvolvido com React + Vite.

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx              # Cabeçalho com navegação
│   ├── PostagemCard.jsx        # Card de postagem
│   ├── PostagemForm.jsx        # Formulário de criação de postagem
│   ├── UsuarioForm.jsx         # Formulário de criação de usuário
│   ├── LoadingSpinner.jsx      # Indicador de carregamento
│   └── ErrorMessage.jsx        # Componente de erro
├── pages/               # Páginas da aplicação
│   ├── HomePage.jsx            # Página inicial com listagem
│   ├── LoginPage.jsx           # Página de login/cadastro
│   └── CriarPostagemPage.jsx   # Página de criar postagem
├── hooks/               # Hooks customizados
│   ├── useUsuarios.js          # Hook para gerenciar usuários
│   └── usePostagens.js         # Hook para gerenciar postagens
├── services/            # Serviços de API
│   └── api.js                  # Chamadas da API
├── styles/              # Estilos CSS dos componentes
│   ├── Header.css
│   ├── PostagemCard.css
│   ├── PostagemForm.css
│   ├── UsuarioForm.css
│   ├── HomePage.css
│   ├── LoginPage.css
│   ├── CriarPostagemPage.css
│   ├── Loading.css
│   └── Error.css
├── App.jsx              # Componente principal
├── App.css              # Estilos globais
├── main.jsx             # Ponto de entrada
└── index.css            # Estilos base
```

## 🎯 Componentes

### Componentes Reutilizáveis

- **Header**: Navegação principal com logo, menu e informações do usuário
- **PostagemCard**: Exibe um card de postagem com detalhes e ações
- **PostagemForm**: Formulário para criar/editar postagens
- **UsuarioForm**: Formulário para criar/editar usuários
- **LoadingSpinner**: Loading animado
- **ErrorMessage**: Componente para exibir erros

### Páginas

- **HomePage**: Listagem de todas as postagens com filtros
- **LoginPage**: Tela de login e cadastro de usuários
- **CriarPostagemPage**: Formulário para criar nova postagem

## 🔌 Hooks Customizados

### useUsuarios

Gerencia operações com usuários (listar, obter, criar, deletar)

```javascript
const {
  usuarios,
  usuarioAtual,
  carregando,
  erro,
  listar,
  obter,
  criar,
  deletar,
} = useUsuarios();
```

### usePostagens

Gerencia operações com postagens (listar, obter, criar, deletar, like)

```javascript
const {
  postagens,
  postagemAtual,
  carregando,
  erro,
  listar,
  obter,
  criar,
  deletar,
  toggleLike,
} = usePostagens();
```

## 📡 Serviço de API

O arquivo `services/api.js` contém todas as chamadas à API:

- `usuariosService.listar()`
- `usuariosService.obter(id)`
- `usuariosService.criar(dados)`
- `usuariosService.deletar(id)`
- `postagensService.listar()`
- `postagensService.obter(id)`
- `postagensService.criar(dados)`
- `postagensService.deletar(id)`
- `postagensService.toggleLike(postagemId, usuarioId)`

## 🎨 Design System

### Cores

- **Primária**: #667eea
- **Primária Escura**: #764ba2
- **Sucesso**: #4caf50
- **Perigo**: #d32f2f
- **Aviso**: #ff9800

### Responsividade

O projeto é totalmente responsivo com breakpoints em:

- Desktop: 1200px
- Tablet: 768px
- Mobile: 480px

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Este projeto usa a API em http://localhost:3001
# Ajuste conforme necessário em services/api.js
```

## 🚀 Como Usar

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview do Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📦 Dependências

- **React**: 19.2.0
- **React DOM**: 19.2.0
- **Vite**: 7.3.1

## 🔄 Fluxo da Aplicação

1. **Home Page**: Listagem de postagens
   - Usuários não logado: só visualizam
   - Usuários logados: podem dar like + deletar próprias postagens

2. **Login Page**: Criar conta ou entrar
   - Criar novo usuário
   - Selecionar usuário existente

3. **Criar Postagem**: Apenas para usuários logados
   - Título, tipo (Venda/Doação), descrição
   - Localidade, valor (opcional)

## 🛠️ Desenvolvimento

### Adicionar novo componente

1. Criar arquivo em `src/components/`
2. Criar arquivo CSS em `src/styles/`
3. Importar e usar no App.jsx ou em outros componentes

### Adicionar novo hook

1. Criar arquivo em `src/hooks/`
2. Exportar como named export
3. Importar onde necessário

### Adicionar nova página

1. Criar arquivo em `src/pages/`
2. Criar estilos em `src/styles/`
3. Adicionar rota no App.jsx

## 📝 Modelos de Dados

### Usuário

```javascript
{
  id: number,
  nome: string,
  telefone: string,
  data_nascimento: date
}
```

### Postagem

```javascript
{
  id: number,
  usuario_id: number,
  titulo: string,
  tipo: 'Venda' | 'Doação',
  descricao: string,
  localidade: string,
  valor: number,
  data_criacao: date,
  dono: string,
  telefone: string,
  total_likes: number
}
```

## 🐛 Tratamento de Erros

Todos os erros são capturados e exibidos através do componente `ErrorMessage`. O usuário pode descartar a mensagem de erro clicando no botão "×".

## ✨ Funcionalidades

- ✅ Listagem de postagens
- ✅ Criação de postagens
- ✅ Deleção de postagens (apenas do dono)
- ✅ Registro de interesse (like) em postagens
- ✅ Criação de conta de usuário
- ✅ Login com usuários existentes
- ✅ Interface responsiva
- ✅ Tratamento de erros
- ✅ Estados de carregamento

## 📱 Compatibilidade

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile ✅

## 🎓 Conceitos Utilizados

- React Hooks (useState, useEffect, useCallback)
- Componentização
- Composição de componentes
- Props drilling
- Custom Hooks
- CSS Grid e Flexbox
- Async/Await
- REST API integration
- Error handling
- Responsive Design

---

**Desenvolvido com ❤️ para o Hackathon EduShare**
