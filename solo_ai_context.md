# SoloDev.AI — Documento de Contexto do Projeto

> Gerado em: Abril de 2026  
> Metodologia de referência: PREVC (Planejamento, Revisão, Execução, Validação, Confirmação)

---

## 1. Visão Geral do Produto

**Nome:** SoloDev.AI  
**Tipo:** Plataforma web de treinamento (SaaS)  
**Modelo de negócio:** Freemium (acesso gratuito ao E-Rank + Awakening Pro mensal)  
**Público-alvo:** Pessoas com noção básica de tecnologia que querem construir aplicações reais usando ferramentas de IA

### Proposta de valor

Ensinar pessoas a construir aplicações completas (frontend, backend e banco de dados) usando ferramentas de IA como Claude Code e VS Code, de forma rápida e intuitiva — com foco em delegar corretamente para a IA, não em memorizar código.

### Diferencial principal

O **Lab de Prompts**: ambiente interativo onde o aluno pratica a escrita de prompts, recebe feedback imediato e compara sua versão com uma versão otimizada. Nenhuma outra plataforma ensina o _como estruturar o prompt_, apenas o resultado final.

---

## 2. Metodologia Pedagógica — PREVC

Toda a plataforma é construída em torno da metodologia PREVC:

| Etapa            | Responsável | Descrição                                                       |
| ---------------- | ----------- | --------------------------------------------------------------- |
| **P**lanejamento | Humano      | Criar PRD, fluxograma de UX e plano.md antes de qualquer código |
| **R**evisão      | Humano      | Separar tarefas da IA das tarefas humanas                       |
| **E**xecução     | IA          | Claude Code executa as tarefas delegadas, fase por fase         |
| **V**alidação    | Humano      | Testar cada fase antes de avançar                               |
| **C**onfirmação  | Humano      | Commitar no Git e confirmar entrega antes da próxima fase       |

> **Princípio central:** planejamento e validação nunca são tarefas da IA.

---

## 3. Modelo de Acesso (Freemium)

### Plano Free

- Fase 1 completa (4 módulos, 14 aulas)
- Conceitos básicos de programação
- 1 projeto de exemplo simples
- Acesso ao fórum da comunidade

### Plano Pro — R$ 47/mês

- Todas as fases (2, 3 e 4)
- 3 projetos guiados full stack
- Lab de Prompts ilimitado
- Templates de PRD e plano.md
- Revisão de código com IA integrada
- Certificado de conclusão
- Garantia de 7 dias

> **Estratégia de conversão:** o paywall aparece apenas após a conclusão da Fase 1, no pico de motivação do aluno — não na entrada, não no meio de uma aula.

---

## 4. Currículo Detalhado

### Fase 1 — Fundamentos e ambiente _(~3h · 4 módulos · 14 aulas · Grátis)_

**Objetivo:** o aluno sai do zero, entende o que é programação e faz sua primeira geração de código com IA.

#### Módulo 1 — O que é desenvolvimento de software

- Frontend, backend e banco de dados: o que são e como se conectam _(analogia com restaurante)_
- O papel da IA no desenvolvimento moderno
- Como funciona um projeto de software: do planejamento ao deploy _(visão geral do PREVC)_

#### Módulo 2 — Configurando o ambiente de trabalho

- Instalando Node.js, Git e VS Code (Windows e Mac)
- Extensões essenciais do VS Code _(GitHub Copilot, Prettier, GitLens)_
- Instalando e autenticando o Claude Code _(login via conta Anthropic, planos)_
- Exercício: terminal rodando + Claude Code autenticado

#### Módulo 3 — Primeiro contato com o terminal

- Comandos essenciais: `cd`, `ls`, `mkdir`, `npm`
- O que é um `package.json` e para que serve
- Git básico: `init`, `add`, `commit`

#### Módulo 4 — Primeira geração de código com IA

- Seu primeiro prompt: criando uma página HTML simples
- Lendo e entendendo o código gerado
- **Projeto da fase:** página de apresentação pessoal gerada com IA

---

### Fase 2 — Conceitos de programação com IA _(~5h · 5 módulos · 18 aulas · Free + Pro)_

**Objetivo:** o aluno aprende conceitos reais de desenvolvimento usando a IA como ferramenta de apoio em cada camada.

#### Módulo 1 — Estrutura de prompts eficazes _(Free)_

- O que faz um bom prompt: contexto, objetivo e restrições
- Prompts para frontend: layout, componentes e estilo
- Prompts para backend: rotas, lógica de negócio e validações
- Prompts para banco de dados: modelagem e queries

#### Módulo 2 — Planejamento com a metodologia PREVC _(Free)_

- O que é um PRD e como criar o seu _(documento simplificado)_
- Quebrando o projeto em fases e tarefas _(o plano.md como guia)_
- O que delegar à IA e o que é responsabilidade sua

#### Módulo 3 — Frontend com Next.js e IA _(Pro)_

- O que é React e por que usar Next.js _(conceito de componentes)_
- Gerando páginas e componentes com Claude Code
- Estado e interatividade: formulários e listas _(useState com analogias)_
- Conectando frontend à API do backend _(fetch, loading state, erros)_

#### Módulo 4 — Backend com Node.js e IA _(Pro)_

- O que é uma API REST e como funciona _(verbos HTTP, rotas, JSON)_
- Criando rotas com Express usando Claude Code
- Validações, autenticação e JWT

#### Módulo 5 — Banco de dados com PostgreSQL e Prisma _(Pro)_

- O que é um banco de dados relacional _(tabelas, colunas, relacionamentos)_
- Modelando tabelas com Prisma Schema via IA
- Queries e migrations: criando e atualizando dados

---

### Fase 3 — Construção de projetos reais _(~8h · 3 projetos · 20 aulas · Pro)_

**Objetivo:** o aluno constrói aplicações completas do zero ao funcional, aplicando PREVC em cada entrega.

#### Projeto 1 — Lista de tarefas full stack

- Criando o PRD e o plano.md do projeto
- Setup: Next.js + Node.js + PostgreSQL integrados
- Backend: API de tarefas com CRUD completo _(rotas, validações, Prisma)_
- Frontend: interface de criação e listagem de tarefas
- Validação e correção de bugs com IA

#### Projeto 2 — Sistema de cadastro com autenticação

- Planejamento: fluxo de usuário e modelagem de dados _(UX Flow + Diagrama ER)_
- Autenticação: registro, login e JWT com IA
- Dashboard protegido e perfil do usuário
- Upload de imagem de perfil
- Iterando com Claude Code: melhorias e refatorações _(uso de compact/clear)_

#### Projeto 3 — Projeto livre orientado _(exclusivo Pro)_

- O aluno define sua própria ideia de aplicação
- Plataforma fornece template de PRD e checklist de planejamento
- Sessão guiada: revisão do planejamento com mentor IA integrado
- Execução autônoma com checkpoints de validação por fase
- Entrega final: portfólio público no GitHub + certificado

---

### Fase 4 — Deploy e boas práticas _(~4h · 4 módulos · 14 aulas · Pro)_

**Objetivo:** o aluno publica suas aplicações, aprende segurança básica e mantém projetos vivos com IA.

#### Módulo 1 — Git e GitHub para devs que usam IA

- Commits estratégicos: salvando checkpoints por fase _(antes de cada tarefa da IA)_
- Branches, merges e como reverter quando a IA quebra tudo
- Pull Requests e revisão de código com Claude Code `(/review)`

#### Módulo 2 — Deploy na nuvem com Vercel e Railway

- Deploy do frontend no Vercel _(GitHub → produção em minutos)_
- Deploy do backend e banco no Railway _(variáveis de ambiente, DATABASE_URL)_
- Domínio personalizado e HTTPS
- Monitoramento básico: logs e alertas

#### Módulo 3 — Segurança e boas práticas com IA

- Variáveis de ambiente e `.env`: o que nunca commitar
- Validação de dados e proteção contra injeção SQL
- Rate limiting e proteção de rotas

#### Módulo 4 — Manutenção e evolução do projeto com IA

- Usando `CLAUDE.md` para dar memória ao projeto _(arquivo de contexto permanente)_
- Adicionando funcionalidades sem quebrar o que funciona _(compact incremental)_
- Quando usar IA e quando escrever na mão
- Trilha completa: certificado e próximos passos

---

## 5. Experiência do Aluno (UX Flow)

### Jornada completa

```
Cadastro (sem cartão)
       ↓
Onboarding (3 perguntas: nível, objetivo, tempo semanal)
       ↓
Dashboard (progresso, próxima aula, métricas)
       ↓
Aula (vídeo curto 5–15min + resumo em texto + exercício)
       ↓
Lab de Prompts (escrita → feedback → versão otimizada)
       ↓
Projeto Guiado (PRD pronto + plano.md + checkpoints por fase)
       ↓
[Paywall ao final da Fase 1]
       ↓
Upgrade → Pro (R$ 47/mês · 7 dias de garantia)
       ↓
Fases 2, 3 e 4 + Certificado
```

### Telas principais

| Tela           | Função principal                                                    |
| -------------- | ------------------------------------------------------------------- |
| Cadastro       | Sem cartão, acesso imediato à Fase 1                                |
| Onboarding     | 3 perguntas para personalizar trilha e ritmo                        |
| Dashboard      | Progresso por fase + botão "Continuar onde parou"                   |
| Aula           | Vídeo + resumo + exercício + navegação em uma página                |
| Lab de Prompts | Escrever prompt → feedback IA → comparar com versão otimizada       |
| Projeto guiado | Fases visuais + checkpoints de validação + download de PRD/plano.md |
| Upgrade        | Aparece após conclusão da Fase 1, não na entrada                    |

### Princípios de UX

- O botão "Continuar onde parou" é o elemento mais importante do dashboard — o aluno nunca fica perdido
- Cada aula termina com uma ação concreta (exercício ou entrega)
- O aluno não avança de fase dentro de um projeto sem completar o checklist de validação
- O paywall aparece no pico de motivação, não na entrada

---

## 6. Arquitetura Técnica da Plataforma

### Stack definida

| Camada         | Tecnologia                     | Motivo                                                                       |
| -------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| Frontend       | Vite + React + TypeScript      | Build rápido, ecossistema moderno, componentes reutilizáveis                 |
| Backend        | Node.js + Express + TypeScript | Mesmo ecossistema JS do frontend; `mysql2` é nativo; didático para os alunos |
| Banco de dados | MySQL + driver `mysql2`        | Escolha do projeto, queries preparadas, maturidade                           |
| Autenticação   | JWT + Argon2                   | JWT para tokens stateless; Argon2 é o padrão atual para hash de senhas       |

> **Por que Node.js e não Python?** O pacote `mysql2` é nativo do Node — sem adapters extras. A stack fica 100% JavaScript/TypeScript do frontend ao backend, facilitando compartilhamento de tipos e sendo didaticamente consistente com o que é ensinado no SoloDev.AI.

---

### Estrutura de pastas

```
solodev-ai/
├── frontend/                   # Vite + React + TypeScript
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # Componentes reutilizáveis
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── PageWrapper.tsx
│   │   │   └── features/       # Componentes de domínio
│   │   │       ├── CourseCard.tsx
│   │   │       ├── LessonPlayer.tsx
│   │   │       └── PromptLab.tsx
│   │   ├── hooks/              # Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCourse.ts
│   │   │   ├── useProgress.ts
│   │   │   └── usePromptLab.ts
│   │   ├── services/           # Camada de comunicação com a API
│   │   │   ├── api.ts          # instância axios configurada
│   │   │   ├── authService.ts
│   │   │   ├── courseService.ts
│   │   │   └── progressService.ts
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Lesson.tsx
│   │   │   ├── PromptLab.tsx
│   │   │   └── Project.tsx
│   │   ├── store/              # Estado global (Zustand ou Context)
│   │   ├── types/              # Interfaces TypeScript compartilhadas
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                    # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts     # Pool de conexões mysql2
│   │   │   └── env.ts          # Validação de variáveis de ambiente
│   │   ├── middleware/         # Middleware de segurança e autenticação
│   │   │   ├── auth.ts         # Verificação JWT
│   │   │   ├── rateLimiter.ts  # express-rate-limit
│   │   │   ├── sanitize.ts     # XSS sanitization
│   │   │   ├── cors.ts         # Configuração CORS
│   │   │   └── errorHandler.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── course.routes.ts
│   │   │   └── progress.routes.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── course.controller.ts
│   │   │   └── progress.controller.ts
│   │   ├── services/           # Lógica de negócio
│   │   │   ├── auth.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── course.service.ts
│   │   │   └── progress.service.ts
│   │   ├── repositories/       # Acesso direto ao banco
│   │   │   ├── user.repository.ts
│   │   │   ├── course.repository.ts
│   │   │   └── progress.repository.ts
│   │   ├── types/
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── hash.ts         # Argon2
│   │   │   └── validate.ts     # Zod schemas
│   │   └── app.ts
│   ├── migrations/             # Scripts SQL versionados
│   ├── package.json
│   └── tsconfig.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

### Segurança — implementações obrigatórias

#### Backend

| Recurso                 | Biblioteca           | Descrição                                                |
| ----------------------- | -------------------- | -------------------------------------------------------- |
| Hash de senhas          | `argon2`             | Substituição moderna ao bcrypt                           |
| Tokens de autenticação  | `jsonwebtoken`       | JWT com expiração curta (15min access + 7d refresh)      |
| Cookies seguros         | `cookie-parser`      | `HttpOnly: true`, `Secure: true`, `SameSite: strict`     |
| Rate limiting           | `express-rate-limit` | Limite por IP: 10 req/min em rotas de auth               |
| Cabeçalhos de segurança | `helmet`             | XSS Protection, Content-Security-Policy, HSTS            |
| CORS                    | `cors`               | Whitelist de origens permitidas via variável de ambiente |
| Sanitização de entrada  | `xss` + `validator`  | Sanitizar todos os inputs antes de queries               |
| Queries preparadas      | `mysql2` nativo      | Nunca concatenar strings em queries SQL                  |
| Variáveis de ambiente   | `dotenv` + `zod`     | Validar todas as env vars na inicialização               |

#### Frontend

| Recurso                 | Abordagem                                                     |
| ----------------------- | ------------------------------------------------------------- |
| Armazenamento de tokens | Cookie HttpOnly — nunca `localStorage` para tokens JWT        |
| XSS                     | React já escapa por padrão; evitar `dangerouslySetInnerHTML`  |
| CSRF                    | Token double-submit cookie para mutações críticas             |
| Validação               | Zod no frontend antes de enviar ao backend                    |
| Interceptor de erro 401 | Redirecionar para login automaticamente via axios interceptor |

---

### Rotas de autenticação

```
POST   /api/auth/register     → criar conta (hash Argon2, JWT gerado)
POST   /api/auth/login        → login (validar hash, retornar access + refresh token)
POST   /api/auth/refresh      → renovar access token via refresh token (HttpOnly cookie)
POST   /api/auth/logout       → invalidar refresh token
GET    /api/auth/me           → dados do usuário autenticado (rota protegida)
```

#### Fluxo de autenticação

```
Cliente → POST /login
        ← access_token (15min, header Authorization)
        ← refresh_token (7 dias, HttpOnly cookie)

[Token expira]
Cliente → POST /refresh (cookie enviado automaticamente)
        ← novo access_token

[Logout]
Cliente → POST /logout
        ← cookie limpo + token invalidado no BD
```

---

### Banco de dados — tabelas principais

```sql
-- Usuários
CREATE TABLE users (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,          -- hash Argon2
  plan        ENUM('free', 'pro') DEFAULT 'free',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tokens de refresh
CREATE TABLE refresh_tokens (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  token       VARCHAR(512) UNIQUE NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cursos
CREATE TABLE courses (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  title       VARCHAR(200) NOT NULL,
  phase       TINYINT NOT NULL,               -- 1, 2, 3 ou 4
  plan_required ENUM('free', 'pro') DEFAULT 'free',
  order_index INT NOT NULL
);

-- Módulos
CREATE TABLE modules (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  course_id   INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  order_index INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Aulas
CREATE TABLE lessons (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  module_id   INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  video_url   VARCHAR(500),
  duration_s  INT,                            -- duração em segundos
  order_index INT NOT NULL,
  FOREIGN KEY (module_id) REFERENCES modules(id)
);

-- Progresso do aluno
CREATE TABLE user_progress (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  lesson_id   INT NOT NULL,
  completed   BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE KEY uq_user_lesson (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Prompts do Lab
CREATE TABLE prompt_submissions (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  lesson_id   INT,
  prompt_text TEXT NOT NULL,
  score       TINYINT,                        -- 0–100
  feedback    TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### Variáveis de ambiente (.env.example)

```env
# Servidor
NODE_ENV=development
PORT=3001

# Banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=devia_academy

# JWT
JWT_SECRET=sua_chave_secreta_longa_e_aleatoria
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# CORS
ALLOWED_ORIGINS=http://localhost:5173

# Rate limit
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_AUTH=10
```

---

## 7. Padrões de desenvolvimento

### Frontend — Convenções

- Componentes: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Services: `camelCaseService.ts`
- Tipos: interfaces com prefixo `I` ou sufixo `Type` (`UserType`, `CourseResponse`)
- Estilização: Tailwind CSS utilitário; sem CSS inline exceto para valores dinâmicos

### Backend — Convenções

- Controllers: apenas recebem request, chamam service, retornam response
- Services: contêm toda a lógica de negócio, nunca acessam BD diretamente
- Repositories: única camada que executa queries mysql2
- Middleware: funções puras, sempre chamam `next()` ou retornam erro padronizado
- Erros: classe `AppError` customizada com status code e mensagem

### Padrão de resposta da API

```json
// Sucesso
{ "success": true, "data": { ... } }

// Erro
{ "success": false, "error": { "message": "...", "code": "INVALID_CREDENTIALS" } }
```

---

## 8. Roadmap de desenvolvimento

| Fase | Entregável                                            | Prioridade |
| ---- | ----------------------------------------------------- | ---------- |
| MVP  | Autenticação completa (register, login, JWT, refresh) | Alta       |
| MVP  | Listagem de cursos e aulas (free)                     | Alta       |
| MVP  | Player de aula + marcação de progresso                | Alta       |
| MVP  | Dashboard com progresso do aluno                      | Alta       |
| V1   | Lab de Prompts com feedback IA (Anthropic API)        | Alta       |
| V1   | Paywall + integração de pagamento (Stripe/Pagar.me)   | Alta       |
| V1   | Projetos guiados com checkpoints                      | Média      |
| V2   | Certificado de conclusão em PDF                       | Média      |
| V2   | Notificações de progresso por e-mail                  | Baixa      |
| V2   | Painel administrativo para gestão de conteúdo         | Média      |

---

## 9. Dependências principais

### Frontend

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "react-router-dom": "^6",
    "axios": "^1",
    "zustand": "^4",
    "zod": "^3",
    "tailwindcss": "^3"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "^4",
    "typescript": "^5"
  }
}
```

### Backend

```json
{
  "dependencies": {
    "express": "^4",
    "mysql2": "^3",
    "argon2": "^0.31",
    "jsonwebtoken": "^9",
    "cookie-parser": "^1",
    "cors": "^2",
    "helmet": "^7",
    "express-rate-limit": "^7",
    "xss": "^1",
    "validator": "^13",
    "zod": "^3",
    "dotenv": "^16"
  },
  "devDependencies": {
    "typescript": "^5",
    "tsx": "^4",
    "@types/express": "^4",
    "@types/jsonwebtoken": "^9"
  }
}
```

---

_Documento gerado com base no planejamento completo da plataforma SoloDev.AI._  
_Próximos passos: iniciar MVP com autenticação → estrutura de cursos → player de aulas → Sala de Treinamento (Lab de Prompts)._

---

## 10. Nome e Identidade da Plataforma

**Nome oficial:** SoloDev.AI  
**Domínio:** solodev.ai  
**Conceito:** Inspirado em Solo Leveling — o usuário evolui sozinho, subindo de rank conforme domina novas habilidades, aprendendo a delegar para a IA com precisão.

**Tagline:** Do E-Rank ao S-Rank Developer. Sozinho. Do seu jeito.

---

## 11. Sistema de Gamificação — Solo Leveling

### 11.1 Léxico da plataforma

Toda a linguagem da interface usa a terminologia do universo Solo Leveling. Nenhum termo genérico de curso ou aluno sobrevive.

| Termo convencional      | Termo SoloDev.AI            |
| ----------------------- | --------------------------- |
| Curso / Plataforma      | Sistema de Caçadas          |
| Aula                    | Missão de treinamento       |
| Projeto guiado          | Dungeon                     |
| Dashboard               | Status Window               |
| Progresso (%)           | XP + Atributos              |
| Fases 1, 2, 3, 4        | Ranks E → D → C → B → A → S |
| Certificado             | Título de S-Rank Developer  |
| Usuário / Aluno         | Hunter                      |
| Lab de Prompts          | Sala de Treinamento         |
| Habilidade aprendida    | Skill desbloqueada          |
| Checkpoint de validação | Boss final do dungeon       |
| Upgrade Pro             | Awakening (Despertar)       |
| Comunidade              | Guilda dos Solo Devs        |
| Streak de dias          | Combo de caçadas            |

---

### 11.2 Sistema de Ranks

#### E-Rank — Initiate

- Fase 1 (gratuita)
- Skills: instalar Node.js, primeiro prompt, Git básico
- Dungeon de saída: página de apresentação gerada com IA

#### D-Rank — Prompt Apprentice

- Fase 2 (requer Awakening)
- Skills: prompt de frontend, prompt de backend, criar PRD, plano.md
- Dungeon de saída: planejamento PREVC completo

#### C-Rank — Full Stack Hunter

- Projeto 1
- Skills: Next.js, API REST, MySQL2, CRUD completo, JWT
- Dungeon: Task Realm — lista de tarefas full stack em produção

#### B-Rank — Auth Specialist

- Projeto 2
- Skills: Argon2, HttpOnly cookie, Rate Limit, CORS, rotas protegidas
- Dungeon: Auth Fortress — sistema de autenticação completo

#### A-Rank — Deploy Master

- Fase 4
- Skills: Vercel, Railway, CI/CD, variáveis de ambiente, HTTPS
- Dungeon de saída: app próprio publicado com domínio personalizado

#### S-Rank — Solo Developer (rank final)

- Dungeon: Shadow Realm (secreto, desbloqueado após A-Rank)
- Recompensa: Certificado S-Rank Developer, acesso vitalício, menção na Guilda

---

### 11.3 Status Window (Dashboard)

O dashboard exibe atributos individuais do Hunter em barras de progresso — não uma porcentagem genérica.

| Atributo         | O que aumenta                    |
| ---------------- | -------------------------------- |
| Prompt Mastery   | Exercícios no Lab de Prompts     |
| Frontend Power   | Aulas e dungeons de interface    |
| Backend Strength | Aulas e dungeons de API          |
| DB Knowledge     | Aulas de banco de dados          |
| Security Level   | Módulo de segurança e Dungeon #2 |
| Deploy Speed     | Fase 4 e publicação de projetos  |

O rank do hunter é determinado pelo atributo mais baixo — incentivando desenvolvimento balanceado.

---

### 11.4 Dungeons (Projetos)

#### Dungeon #1 — Task Realm (C-Rank)

- Missão: sistema de tarefas full stack do zero
- Recompensas: +15 Frontend Power, +20 Backend Strength, +10 DB Knowledge
- Drop raro: Badge "First Deploy"
- Boss final: checklist de validação com 4 itens obrigatórios

#### Dungeon #2 — Auth Fortress (B-Rank)

- Missão: autenticação completa com JWT, Argon2, upload de avatar
- Recompensas: +25 Security Level, +15 Backend Strength
- Drop raro: Badge "Auth Specialist"
- Boss final: checklist de segurança manual

#### Dungeon #3 — The Gate (A-Rank, projeto livre)

- Missão: hunter define a ideia, cria PRD, executa com PREVC
- Recompensas: +30 em todos os atributos
- Drop raro: Badge "Gate Opener"
- Boss final: app publicado + repositório público no GitHub

#### Dungeon S — Shadow Realm (S-Rank, secreto)

- Acesso: desbloqueado apenas após A-Rank
- Conteúdo: não revelado
- Drop raro: Badge "Shadow Monarch" (exclusivo, intransferível)

---

### 11.5 Sistema de Quests

**Missões principais (desbloqueiam o próximo rank)**

| Quest                        | Recompensa                   |
| ---------------------------- | ---------------------------- |
| Configurar o arsenal         | +200 XP, desbloqueia D-Rank  |
| Primeiro dungeon conquistado | +500 XP, desbloqueia C-Rank  |
| Abrir o Gate                 | +1000 XP, desbloqueia S-Rank |

**Missões diárias**

| Quest                               | Recompensa                |
| ----------------------------------- | ------------------------- |
| Treino no Lab (1 prompt + feedback) | +30 XP, +2 Prompt Mastery |
| Assistir a missão do dia (1 aula)   | +20 XP, streak bonus      |

**Missões secundárias (opcionais)**

| Quest              | Recompensa                          |
| ------------------ | ----------------------------------- |
| Publicar no GitHub | +150 XP, Badge "Open Source Hunter" |
| Streak de 7 dias   | +300 XP, Badge "Persistent Hunter"  |
| Primeiro PR        | +100 XP, Badge "Team Player"        |

---

### 11.6 O Awakening (Paywall)

O upgrade Pro não é chamado de assinar — é o Despertar (Awakening).

Narrativa da tela de upgrade:
"Você completou sua primeira dungeon. Seus atributos acordaram. O sistema reconhece seu potencial."
"Hunters que param no E-Rank nunca sabem o que poderiam ter construído."
"Está pronto para despertar?"

- CTA: Despertar agora — R$ 47/mês
- Sub: Cancele quando quiser. Garantia de 7 dias.
- Aparece após conclusão do Dungeon E-Rank, no pico de motivação do hunter.

---

### 11.7 Guilda dos Solo Devs (Comunidade)

- Feed de conquistas públicas (dungeons concluídas, ranks atingidos)
- Canal de dúvidas segmentado por rank
- Hall of Fame dos S-Rank Developers
- Showcase de projetos publicados
- Hunters S-Rank ganham menção pública permanente

---

_Documento atualizado — SoloDev.AI v2.0_
