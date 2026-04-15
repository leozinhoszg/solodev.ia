# SoloDev.AI

Plataforma freemium de aprendizado em desenvolvimento assistido por IA, com sistema de gamificação RPG.

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://dev.mysql.com/downloads/) 8.0+
- [Git](https://git-scm.com/)

## Configuração do Banco de Dados

Crie o banco de dados no MySQL:

```sql
CREATE DATABASE solodev_ai CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/solodev.ia.git
cd solodev.ia
```

### 2. Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=solodev_ai
JWT_SECRET=uma_chave_secreta_com_pelo_menos_32_caracteres
ANTHROPIC_API_KEY=sk-ant-sua-chave
```

Execute as migrações e seeds:

```bash
npx knex migrate:latest
npx knex seed:run
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará rodando em `http://localhost:3001`.

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm install gsap
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:5173`.

## Scripts Disponíveis

### Backend

| Comando                | Descrição                          |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Inicia em modo desenvolvimento     |
| `npm run build`        | Compila TypeScript                 |
| `npm start`            | Inicia versão compilada            |
| `npx knex migrate:latest`   | Executa todas as migrações   |
| `npx knex migrate:rollback` | Reverte última batch         |
| `npx knex seed:run`         | Popula o banco com dados iniciais |

### Frontend

| Comando             | Descrição                        |
| ------------------- | -------------------------------- |
| `npm run dev`       | Inicia Vite dev server           |
| `npm run build`     | Compila para produção            |
| `npm run preview`   | Preview do build de produção     |

## Variáveis de Ambiente

Veja o arquivo [`backend/.env.example`](backend/.env.example) para a lista completa. As variáveis obrigatórias para rodar localmente são:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — conexão MySQL
- `JWT_SECRET` — chave para tokens JWT (mínimo 32 caracteres)

Variáveis opcionais para funcionalidades específicas:

- `ANTHROPIC_API_KEY` — Lab de Prompts (avaliação de prompts com Claude)
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` — pagamentos
- `BUNNY_*` — hospedagem de vídeos e avatares
- `SMTP_*` — envio de e-mails (reset de senha)

## Estrutura do Projeto

```
solodev.ia/
├── backend/           # API Express + TypeScript
│   ├── src/
│   │   ├── config/        # Env e database
│   │   ├── controllers/   # Handlers HTTP
│   │   ├── services/      # Lógica de negócio
│   │   ├── repositories/  # Acesso a dados (Knex)
│   │   ├── routes/        # Definição de rotas
│   │   ├── middleware/     # Auth, error handler, rate limit
│   │   └── utils/         # AppError, JWT, hash, validação
│   └── migrations/        # 22 migrações Knex
├── frontend/          # React 19 + Vite + Tailwind
│   └── src/
│       ├── pages/         # Páginas da aplicação
│       ├── components/    # Componentes UI e features
│       ├── hooks/         # Hooks customizados
│       ├── store/         # Zustand stores
│       └── services/      # Camada de API (Axios)
└── CLAUDE.md          # Contexto para Claude Code
```
