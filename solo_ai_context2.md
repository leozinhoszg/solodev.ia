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
- Fase 2: Módulos 1 e 2 (Prompts + PREVC — 2 módulos, ~7 aulas)
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

### Stack definida — duas stacks intencionalmente diferentes

A plataforma usa uma stack, o currículo ensina outra. Isso é uma decisão consciente, não uma inconsistência.

|              | Stack da plataforma (o produto)            | Stack do currículo (o que se ensina)             |
| ------------ | ------------------------------------------ | ------------------------------------------------ |
| **Frontend** | Vite + React + TypeScript                  | Next.js + React + TypeScript                     |
| **Backend**  | Node.js + Express + TypeScript             | Node.js + Express + TypeScript                   |
| **Banco**    | MySQL + `mysql2` (raw queries)             | PostgreSQL + Prisma ORM                          |
| **Motivo**   | Controle total, sem abstração, performance | Mercado de trabalho, DX superior para iniciantes |

**Por que a plataforma usa MySQL + mysql2 raw?**
Controle explícito sobre cada query, sem camadas de abstração que escondem o que acontece no banco. Isso é importante para um produto em produção onde performance e rastreabilidade importam.

**Por que o currículo ensina PostgreSQL + Prisma?**
O Prisma tem sintaxe altamente legível nos prompts do Claude Code — descrever entidades em português e gerar schema é natural. PostgreSQL é o padrão do mercado para novos projetos. O hunter aprende o que o mercado usa, não necessariamente o que a plataforma usa internamente.

**Por que Node.js + Express em ambos?**
Backend unificado — o hunter entende o backend da plataforma e do currículo com o mesmo mental model. Sem ruptura cognitiva.

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
│   │   ├── store/              # Estado global — Zustand
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
│   ├── migrations/             # Scripts SQL versionados via Knex
│   │   ├── 001_create_users.js
│   │   ├── 002_create_courses.js
│   │   └── ...
│   ├── seeds/                  # Dados iniciais (cursos, módulos, aulas)
│   │   └── 001_seed_courses.js
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
POST   /api/auth/register           → criar conta (hash Argon2, JWT gerado)
POST   /api/auth/login              → login (validar hash, retornar access + refresh token)
POST   /api/auth/refresh            → renovar access token via refresh token (HttpOnly cookie)
POST   /api/auth/logout             → invalidar refresh token
GET    /api/auth/me                 → dados do usuário autenticado (rota protegida)
POST   /api/auth/forgot-password    → gerar token de reset e enviar e-mail
POST   /api/auth/reset-password     → validar token e salvar nova senha (hash Argon2)
```

#### Fluxo de reset de senha

```
Cliente → POST /forgot-password { email }
        ← 200 OK (sempre, mesmo se e-mail não existir — evita user enumeration)
        → e-mail enviado com link: https://solodev.ai/reset?token=<uuid>

Cliente → POST /reset-password { token, new_password }
        ← 200 OK + novo access_token  (token de reset invalidado após uso)
        ← 400 se token expirado (TTL: 1 hora) ou já utilizado
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
-- =============================================
-- CORE: usuários e autenticação
-- =============================================

CREATE TABLE users (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) UNIQUE NOT NULL,
  password      VARCHAR(255) NOT NULL,            -- hash Argon2
  avatar_url    VARCHAR(500),
  plan          ENUM('free', 'pro') DEFAULT 'free',
  plan_expires_at TIMESTAMP NULL,
  current_rank  ENUM('E','D','C','B','A','S') DEFAULT 'E',
  total_xp      INT DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE refresh_tokens (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  token       VARCHAR(512) UNIQUE NOT NULL,
  expires_at  TIMESTAMP NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE password_reset_tokens (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  token       VARCHAR(255) UNIQUE NOT NULL,       -- UUID gerado no servidor
  used        BOOLEAN DEFAULT FALSE,
  expires_at  TIMESTAMP NOT NULL,                 -- TTL: 1 hora
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- ONBOARDING
-- =============================================

CREATE TABLE user_onboarding (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT UNIQUE NOT NULL,
  level           ENUM('beginner','some_notion','professional') NOT NULL,
  goal            ENUM('own_business','portfolio','saas','not_sure') NOT NULL,
  weekly_hours    TINYINT NOT NULL,               -- horas por semana disponíveis
  completed_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- CONTEÚDO: cursos, módulos, aulas
-- =============================================

CREATE TABLE courses (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  title         VARCHAR(200) NOT NULL,
  rank_required ENUM('E','D','C','B','A','S') DEFAULT 'E',
  plan_required ENUM('free','pro') DEFAULT 'free',
  order_index   INT NOT NULL
);

CREATE TABLE modules (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  course_id   INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  order_index INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE lessons (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  module_id       INT NOT NULL,
  title           VARCHAR(200) NOT NULL,
  video_provider  ENUM('bunny') DEFAULT 'bunny',
  video_id        VARCHAR(255),                   -- ID do vídeo no Bunny.net
  video_url       VARCHAR(500),                   -- URL de embed do Bunny.net
  duration_s      INT,                            -- duração em segundos
  xp_reward       INT DEFAULT 20,                 -- XP concedido ao completar
  order_index     INT NOT NULL,
  FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE TABLE user_progress (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  user_id       INT NOT NULL,
  lesson_id     INT NOT NULL,
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMP NULL,
  UNIQUE KEY uq_user_lesson (user_id, lesson_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- =============================================
-- SALA DE TREINAMENTO (Lab de Prompts)
-- =============================================

CREATE TABLE prompt_submissions (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  lesson_id   INT,
  prompt_text TEXT NOT NULL,
  score       TINYINT,                            -- 0–100
  feedback    TEXT,
  xp_earned   INT DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);

-- =============================================
-- GAMIFICAÇÃO: XP, atributos, badges, quests, streaks
-- =============================================

CREATE TABLE user_attributes (
  id                INT PRIMARY KEY AUTO_INCREMENT,
  user_id           INT UNIQUE NOT NULL,
  prompt_mastery    TINYINT DEFAULT 0,            -- 0–100
  frontend_power    TINYINT DEFAULT 0,
  backend_strength  TINYINT DEFAULT 0,
  db_knowledge      TINYINT DEFAULT 0,
  security_level    TINYINT DEFAULT 0,
  deploy_speed      TINYINT DEFAULT 0,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE xp_transactions (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  amount      INT NOT NULL,                       -- pode ser negativo (futuramente)
  source      ENUM('lesson','prompt_lab','quest','dungeon','streak_bonus') NOT NULL,
  source_id   INT,                                -- ID do item de origem
  description VARCHAR(255),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE badges (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  slug        VARCHAR(100) UNIQUE NOT NULL,       -- 'first_deploy', 'auth_specialist'
  name        VARCHAR(150) NOT NULL,
  description TEXT,
  rank_tier   ENUM('E','D','C','B','A','S') DEFAULT 'E'
);

CREATE TABLE user_badges (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  badge_id    INT NOT NULL,
  earned_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_badge (user_id, badge_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (badge_id) REFERENCES badges(id)
);

CREATE TABLE quests (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  slug          VARCHAR(100) UNIQUE NOT NULL,
  title         VARCHAR(200) NOT NULL,
  description   TEXT,
  type          ENUM('main','daily','side') NOT NULL,
  xp_reward     INT NOT NULL,
  badge_id      INT,                              -- badge concedido ao completar (opcional)
  reset_daily   BOOLEAN DEFAULT FALSE,            -- TRUE para quests diárias
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE SET NULL
);

CREATE TABLE user_quests (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  user_id       INT NOT NULL,
  quest_id      INT NOT NULL,
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMP NULL,
  UNIQUE KEY uq_user_quest (user_id, quest_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (quest_id) REFERENCES quests(id)
);

CREATE TABLE user_streaks (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT UNIQUE NOT NULL,
  current_streak  INT DEFAULT 0,                  -- dias consecutivos
  longest_streak  INT DEFAULT 0,
  last_activity   DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =============================================
-- DUNGEONS (projetos guiados)
-- =============================================

CREATE TABLE dungeons (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  slug          VARCHAR(100) UNIQUE NOT NULL,     -- 'task-realm', 'auth-fortress'
  title         VARCHAR(200) NOT NULL,
  rank_required ENUM('C','B','A','S') NOT NULL,
  description   TEXT,
  xp_reward     INT NOT NULL,
  badge_id      INT,
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE SET NULL
);

CREATE TABLE dungeon_checkpoints (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  dungeon_id    INT NOT NULL,
  description   VARCHAR(300) NOT NULL,            -- item do checklist (boss final)
  order_index   INT NOT NULL,
  FOREIGN KEY (dungeon_id) REFERENCES dungeons(id)
);

CREATE TABLE user_dungeons (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT NOT NULL,
  dungeon_id      INT NOT NULL,
  status          ENUM('not_started','in_progress','completed') DEFAULT 'not_started',
  started_at      TIMESTAMP NULL,
  completed_at    TIMESTAMP NULL,
  UNIQUE KEY uq_user_dungeon (user_id, dungeon_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dungeon_id) REFERENCES dungeons(id)
);

CREATE TABLE user_dungeon_checkpoints (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT NOT NULL,
  checkpoint_id   INT NOT NULL,
  checked         BOOLEAN DEFAULT FALSE,
  checked_at      TIMESTAMP NULL,
  UNIQUE KEY uq_user_checkpoint (user_id, checkpoint_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (checkpoint_id) REFERENCES dungeon_checkpoints(id)
);

-- =============================================
-- PAGAMENTOS (Awakening / Pro)
-- =============================================

CREATE TABLE subscriptions (
  id                    INT PRIMARY KEY AUTO_INCREMENT,
  user_id               INT NOT NULL,
  provider              ENUM('stripe','pagarme') NOT NULL,
  provider_customer_id  VARCHAR(255),             -- ID do cliente no gateway
  provider_sub_id       VARCHAR(255),             -- ID da assinatura no gateway
  status                ENUM('active','cancelled','past_due','trialing') NOT NULL,
  plan                  ENUM('pro') DEFAULT 'pro',
  current_period_start  TIMESTAMP NOT NULL,
  current_period_end    TIMESTAMP NOT NULL,
  cancel_at_period_end  BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE payment_events (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  user_id         INT,
  subscription_id INT,
  event_type      VARCHAR(100) NOT NULL,           -- 'payment_succeeded', 'subscription_cancelled'
  provider        ENUM('stripe','pagarme') NOT NULL,
  provider_event_id VARCHAR(255) UNIQUE,           -- ID do evento no gateway (idempotência)
  payload         JSON,                            -- payload bruto do webhook
  processed_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL
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
DB_NAME=solodev_ai

# JWT
JWT_SECRET=sua_chave_secreta_longa_e_aleatoria
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# CORS
ALLOWED_ORIGINS=http://localhost:5173

# Rate limit
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_AUTH=10

# Vídeo — Bunny.net
BUNNY_LIBRARY_ID=seu_library_id
BUNNY_API_KEY=sua_api_key
BUNNY_CDN_URL=https://seu-pullzone.b-cdn.net

# Storage — Bunny.net (avatares)
BUNNY_STORAGE_ZONE=solodev-avatars
BUNNY_STORAGE_API_KEY=sua_storage_key
BUNNY_STORAGE_CDN_URL=https://solodev-avatars.b-cdn.net

# E-mail (password reset)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=sua_api_key_resend
SMTP_FROM=noreply@solodev.ai

# Pagamentos
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

### Estado global — Zustand

Zustand foi escolhido no lugar de Context API pelos seguintes motivos:

- Sem provider hell — não precisa envolver a árvore de componentes
- Sintaxe simples e tipagem TypeScript nativa
- Devtools integrados para depuração
- Performance superior: componentes re-renderizam apenas quando o slice que consomem muda
- Persiste facilmente no `localStorage` via middleware `persist` (para preferências de UI, não tokens)

```ts
// store/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: () => get().user !== null,
}));
```

---

### Migrations — Knex.js

Knex.js é a ferramenta de migrations para o MySQL2. Oferece versionamento de schema, rollback, seeds e CLI integrada — sem abstração de ORM, mantendo o controle total das queries.

```bash
# Instalação
npm install knex --save
npm install knex -g   # CLI global

# Comandos principais
knex migrate:make create_users       # criar arquivo de migration
knex migrate:latest                  # rodar migrations pendentes
knex migrate:rollback                # reverter última migration
knex seed:run                        # rodar seeds
```

```js
// migrations/001_create_users.js
exports.up = (knex) =>
  knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("name", 100).notNullable();
    t.string("email", 150).unique().notNullable();
    t.string("password", 255).notNullable();
    t.enu("plan", ["free", "pro"]).defaultTo("free");
    t.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable("users");
```

---

### Testes — Vitest + Supertest + Playwright

Três camadas de teste cobrindo frontend, backend e fluxos E2E.

| Ferramenta   | Camada   | O que testa                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| `Vitest`     | Frontend | Componentes React, hooks, stores Zustand, services         |
| `Supertest`  | Backend  | Rotas Express, middleware, respostas de API                |
| `Playwright` | E2E      | Fluxos completos: cadastro, login, completar aula, dungeon |

```bash
# Instalação
npm install -D vitest @testing-library/react @testing-library/user-event
npm install -D supertest @types/supertest
npm install -D @playwright/test
```

```ts
// Exemplo Vitest — hook useAuth
import { renderHook } from "@testing-library/react";
import { useAuthStore } from "../store/useAuthStore";

test("setUser atualiza o estado corretamente", () => {
  const { result } = renderHook(() => useAuthStore());
  result.current.setUser({ id: 1, name: "Ana", email: "ana@test.com" });
  expect(result.current.isAuthenticated()).toBe(true);
});

// Exemplo Supertest — rota POST /api/auth/login
import request from "supertest";
import app from "../app";

test("login retorna 200 e access_token com credenciais válidas", async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "test@solodev.ai", password: "senha_valida" });
  expect(res.status).toBe(200);
  expect(res.body.data).toHaveProperty("access_token");
});
```

**Estratégia de cobertura mínima para MVP:**

- Todas as rotas de autenticação (register, login, refresh, logout, forgot, reset)
- Middleware de auth (token válido, token expirado, sem token)
- Fluxo de cadastro + onboarding + primeira aula (E2E Playwright)

---

### Hosting de vídeo — Bunny.net

**Bunny.net Stream** é a escolha para hosting de vídeos da plataforma.

| Critério            | Bunny.net                              | Vimeo Pro                | Cloudflare Stream |
| ------------------- | -------------------------------------- | ------------------------ | ----------------- |
| Custo               | ~$0.005/min armazenado + CDN           | $20–50/mês fixo          | $5/1000 min       |
| CDN global          | Sim (PoPs no Brasil)                   | Sim                      | Sim               |
| Player customizável | Sim (embed sem marca)                  | Sim                      | Sim               |
| DRM / proteção      | Sim (token-based URLs)                 | Sim                      | Sim               |
| API para upload     | Sim                                    | Sim                      | Sim               |
| Melhor para         | Volume variável, custo baixo no início | Volume fixo e previsível | Escala alta       |

**Por que Bunny.net:** custo por uso sem comprometer com plano fixo. No início, com poucos vídeos e hunters, o custo é próximo de zero. CDN tem PoP em São Paulo, garantindo latência baixa para o público brasileiro.

**Integração:** cada aula armazena `video_id` (ID no Bunny) e `video_url` (URL de embed). O player do Bunny é embutido via iframe no componente `LessonPlayer.tsx`. URLs de vídeo são assinadas por token para impedir acesso direto sem autenticação na plataforma.

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
    "typescript": "^5",
    "vitest": "^1",
    "@testing-library/react": "^14",
    "@testing-library/user-event": "^14",
    "@playwright/test": "^1"
  }
}
```

### Backend

```json
{
  "dependencies": {
    "express": "^4",
    "mysql2": "^3",
    "knex": "^3",
    "argon2": "^0.31",
    "jsonwebtoken": "^9",
    "cookie-parser": "^1",
    "cors": "^2",
    "helmet": "^7",
    "express-rate-limit": "^7",
    "xss": "^1",
    "validator": "^13",
    "zod": "^3",
    "dotenv": "^16",
    "resend": "^2"
  },
  "devDependencies": {
    "typescript": "^5",
    "tsx": "^4",
    "@types/express": "^4",
    "@types/jsonwebtoken": "^9",
    "vitest": "^1",
    "supertest": "^6",
    "@types/supertest": "^2"
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
