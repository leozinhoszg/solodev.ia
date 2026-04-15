import { Router } from "express";

const router = Router();

type Endpoint = {
  method: string;
  path: string;
  description: string;
  auth: boolean;
};

type IconKey =
  | "lock"
  | "bookOpen"
  | "barChart"
  | "flask"
  | "swords"
  | "castle"
  | "creditCard"
  | "settings";

type Section = {
  id: string;
  title: string;
  icon: IconKey;
  description: string;
  endpoints: Endpoint[];
};

const icon = (key: IconKey, size = 20): string => {
  const attrs = `xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const paths: Record<IconKey, string> = {
    lock: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
    bookOpen: `<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>`,
    barChart: `<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>`,
    flask: `<path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>`,
    swords: `<polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/>`,
    castle: `<path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M18 11V4H6v7"/><path d="M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4"/><path d="M22 11V9"/><path d="M2 11V9"/><path d="M6 4V2"/><path d="M18 4V2"/><path d="M10 4V2"/><path d="M14 4V2"/>`,
    creditCard: `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`,
    settings: `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
  };
  return `<svg ${attrs}>${paths[key]}</svg>`;
};

const sections: Section[] = [
  {
    id: "auth",
    title: "Authentication",
    icon: "lock",
    description: "Registro, login, refresh de tokens e reset de senha. Rate-limited (10 req/60s).",
    endpoints: [
      { method: "POST", path: "/api/auth/register", description: "Cria nova conta (email + password)", auth: false },
      { method: "POST", path: "/api/auth/login", description: "Autentica e retorna access + refresh tokens", auth: false },
      { method: "POST", path: "/api/auth/refresh", description: "Gera novo access token via refresh token", auth: false },
      { method: "POST", path: "/api/auth/logout", description: "Invalida refresh token", auth: false },
      { method: "GET", path: "/api/auth/me", description: "Retorna dados do usuário autenticado", auth: true },
      { method: "POST", path: "/api/auth/forgot-password", description: "Envia email com token de reset", auth: false },
      { method: "POST", path: "/api/auth/reset-password", description: "Define nova senha via token", auth: false },
    ],
  },
  {
    id: "courses",
    title: "Courses",
    icon: "bookOpen",
    description: "Cursos, módulos e lições do catálogo.",
    endpoints: [
      { method: "GET", path: "/api/courses", description: "Lista todos os cursos", auth: true },
      { method: "GET", path: "/api/courses/:id", description: "Detalhes do curso com módulos e lições", auth: true },
      { method: "GET", path: "/api/courses/:id/lessons/:lessonId", description: "Conteúdo de uma lição", auth: true },
    ],
  },
  {
    id: "progress",
    title: "Progress",
    icon: "barChart",
    description: "Dashboard e progressão de lições.",
    endpoints: [
      { method: "GET", path: "/api/progress/dashboard", description: "Estatísticas e progresso do usuário", auth: true },
      { method: "POST", path: "/api/progress/lessons/:lessonId/complete", description: "Marca lição como concluída e concede XP", auth: true },
    ],
  },
  {
    id: "prompts",
    title: "Prompt Lab",
    icon: "flask",
    description: "Submissão e avaliação de prompts via Claude Sonnet 4. Até 30 XP por prompt.",
    endpoints: [
      { method: "POST", path: "/api/prompts/submit", description: "Avalia prompt (retorna score 0-100 + feedback)", auth: true },
      { method: "GET", path: "/api/prompts/history", description: "Histórico de prompts submetidos", auth: true },
    ],
  },
  {
    id: "gamification",
    title: "Gamification",
    icon: "swords",
    description: "Sistema de XP, Ranks (E→S), atributos, badges, quests e streaks.",
    endpoints: [
      { method: "GET", path: "/api/gamification", description: "Retorna rank, XP, atributos, badges, quests e streak", auth: true },
      { method: "POST", path: "/api/gamification/activity", description: "Registra atividade do usuário (atualiza streak)", auth: true },
      { method: "POST", path: "/api/gamification/quests/:slug/complete", description: "Completa quest e concede recompensa", auth: true },
    ],
  },
  {
    id: "dungeons",
    title: "Dungeons",
    icon: "castle",
    description: "Projetos baseados em aprendizado com checkpoints e boss validation. Rank-gated.",
    endpoints: [
      { method: "GET", path: "/api/dungeons", description: "Lista dungeons disponíveis", auth: true },
      { method: "GET", path: "/api/dungeons/:slug", description: "Detalhes da dungeon com checkpoints", auth: true },
      { method: "POST", path: "/api/dungeons/:slug/start", description: "Inicia dungeon", auth: true },
      { method: "POST", path: "/api/dungeons/:slug/checkpoints/:checkpointId", description: "Valida checkpoint", auth: true },
      { method: "POST", path: "/api/dungeons/:slug/complete", description: "Valida boss e completa dungeon", auth: true },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    icon: "creditCard",
    description: "Stripe checkout para Awakening Pro (R$47/mês BRL) e webhook de lifecycle.",
    endpoints: [
      { method: "POST", path: "/api/payments/create-checkout", description: "Cria sessão de checkout Stripe", auth: true },
      { method: "GET", path: "/api/payments/status", description: "Status da assinatura do usuário", auth: true },
      { method: "POST", path: "/api/payments/webhook", description: "Webhook Stripe (raw body, signature-verified)", auth: false },
    ],
  },
  {
    id: "system",
    title: "System",
    icon: "settings",
    description: "Endpoints utilitários.",
    endpoints: [
      { method: "GET", path: "/", description: "Informações do serviço", auth: false },
      { method: "GET", path: "/api/health", description: "Health check (status, uptime, timestamp)", auth: false },
      { method: "GET", path: "/api/docs", description: "Esta página de documentação", auth: false },
      { method: "GET", path: "/api/docs.json", description: "Documentação em formato JSON", auth: false },
    ],
  },
];

const SOLODEV_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.4066 156" class="solodev-logo">
  <defs>
    <linearGradient id="logo-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="200" y2="120">
      <stop offset="0%" stop-color="#7425ff"/>
      <stop offset="50%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#7425ff"/>
    </linearGradient>
    <linearGradient id="logo-grad-accent" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="20">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#7425ff"/>
    </linearGradient>
    <filter id="logo-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <g transform="matrix(1.20175378,0,0,1.20175378,70.91186,-10.0925)" fill="url(#logo-grad)" filter="url(#logo-glow)">
    <path d="m50 72.008c-0.91797 0-1.832-0.046874-2.7422-0.14453-8.9727-0.94531-16.824-6.4453-20.777-14.551-3.9531-8.1094-3.4492-17.684 1.332-25.332 4.7812-7.6484 13.168-12.297 22.188-12.297 0.91016 0 1.8203 0.046875 2.7227 0.14062h0.019532c9.2578 0.96875 17.363 6.8594 21.156 15.375 3.8008 8.5469 2.7539 18.469-2.7422 26.035-4.918 6.7773-12.785 10.781-21.156 10.773zm0-49.121c-12.66 0-22.961 10.301-22.961 22.961-0.007812 5.6719 2.0898 11.148 5.8828 15.367 3.7969 4.2188 9.0234 6.8789 14.668 7.4688 0.80078 0.082031 1.6055 0.125 2.4102 0.125 7.9141-0.003906 15.27-4.0781 19.465-10.789 4.1992-6.707 4.6445-15.105 1.1797-22.223-3.4609-7.1172-10.348-11.945-18.215-12.785h-0.019532c-0.80078-0.082031-1.6055-0.125-2.4102-0.125z"/>
    <g>
      <path d="m18.305 41.191c-0.10156 0-0.20703-0.007812-0.30859-0.027344-0.86719-0.17187-1.4336-1.0117-1.2617-1.8789 1.3047-6.5938 4.5391-12.652 9.293-17.406s10.812-7.9883 17.406-9.293c0.86719-0.17188 1.707 0.39453 1.8789 1.2617 0.17188 0.86719-0.39453 1.707-1.2617 1.8789-12.09 2.3633-21.805 12.082-24.176 24.172-0.14844 0.75-0.80469 1.293-1.5703 1.293z"/>
      <path d="m81.695 41.191c-0.76562 0-1.4219-0.54297-1.5703-1.293-2.3711-12.094-12.09-21.809-24.18-24.18-0.41797-0.082031-0.78516-0.32422-1.0195-0.67578-0.23828-0.35156-0.32422-0.78516-0.24219-1.2031 0.16797-0.86719 1.0117-1.4297 1.8789-1.2617 6.5938 1.3047 12.652 4.543 17.406 9.2969s7.9883 10.812 9.293 17.41c0.082031 0.41406-0.003907 0.84766-0.24219 1.1992-0.23438 0.35156-0.60156 0.59766-1.0195 0.67969-0.10156 0.019532-0.20312 0.027344-0.30469 0.027344z"/>
      <path d="m43.75 79.141c-0.10547 0-0.20703-0.007813-0.3125-0.027344-6.5938-1.3008-12.656-4.5352-17.41-9.2891-4.7539-4.7539-7.9883-10.816-9.2891-17.414-0.085937-0.41797-0.003906-0.85547 0.23047-1.2109 0.23828-0.35938 0.60938-0.60547 1.0273-0.6875 0.42188-0.082031 0.85547 0.007812 1.2109 0.25 0.35547 0.24219 0.59766 0.61328 0.67188 1.0352 1.1797 5.9727 4.1055 11.461 8.4141 15.77 4.3047 4.3047 9.793 7.2305 15.766 8.4102 0.80859 0.16016 1.3633 0.90625 1.2852 1.7227-0.078125 0.82031-0.76562 1.4453-1.5898 1.4492z"/>
      <path d="m56.25 79.141c-0.82031 0-1.5117-0.625-1.5898-1.4453-0.078125-0.82031 0.47656-1.5664 1.2852-1.7227 5.9727-1.1797 11.461-4.1055 15.77-8.4141 4.3047-4.3047 7.2305-9.793 8.4102-15.766 0.078125-0.42188 0.32031-0.79688 0.67188-1.0391 0.35547-0.23828 0.78906-0.32812 1.2109-0.24609 0.42188 0.082032 0.78906 0.32813 1.0273 0.6875 0.23438 0.35547 0.32031 0.79297 0.23047 1.2109-1.3008 6.5977-4.5352 12.656-9.2891 17.414-4.7539 4.7539-10.812 7.9844-17.41 9.2852-0.10547 0.023437-0.21094 0.035156-0.31641 0.035156z"/>
    </g>
    <g class="logo-iris">
      <path d="m62.113 39.953h-0.042969c-0.88281-0.023437-1.582-0.75781-1.5586-1.6406 0.19141-7.375-2.6406-12.434-8.6562-15.465-0.78906-0.39844-1.1055-1.3633-0.70703-2.1523 0.39844-0.78906 1.3633-1.1055 2.1523-0.70703 7.1367 3.6016 10.637 9.7891 10.414 18.406-0.023438 0.87109-0.73438 1.5625-1.6016 1.5586z"/>
      <path d="m49.566 33.211c-0.29297 0-0.58203-0.082032-0.83594-0.23438-6.2891-3.8516-12.086-3.9297-17.723-0.23437l0.003907-0.003907c-0.35547 0.23438-0.78906 0.31641-1.2031 0.23047-0.41797-0.085938-0.78125-0.33594-1.0117-0.69141-0.48438-0.73828-0.27734-1.7305 0.46094-2.2148 6.6836-4.3789 13.801-4.3164 21.148 0.18359h-0.003906c0.61328 0.375 0.89844 1.1133 0.70312 1.8008-0.19141 0.69141-0.82422 1.1641-1.5391 1.1641z"/>
      <path d="m27.555 57.441c-0.84766 0-1.5508-0.66016-1.5977-1.5078-0.45703-7.9883 3.1562-14.121 10.734-18.234 0.77344-0.38281 1.7109-0.089844 2.1211 0.66797 0.41406 0.75781 0.15234 1.707-0.59375 2.1445-6.4844 3.5195-9.4492 8.5-9.0664 15.238h0.003906c0.046875 0.88281-0.625 1.6367-1.5078 1.6875z"/>
      <path d="m47.426 71.875c-0.25 0-0.49609-0.058594-0.72266-0.17188-7.1328-3.5938-10.637-9.7891-10.414-18.402 0.023438-0.88281 0.75781-1.582 1.6406-1.5586 0.88672 0.023437 1.582 0.75781 1.5586 1.6406-0.19141 7.375 2.6406 12.434 8.6562 15.465 0.66406 0.33594 1.0117 1.0781 0.83984 1.8008-0.17188 0.72266-0.81641 1.2305-1.5586 1.2305z"/>
      <path d="m60.566 64.867c-3.5781 0-7.2461-1.1406-10.969-3.4258v0.003906c-0.375-0.21484-0.64453-0.57422-0.75-0.99219-0.10547-0.41797-0.035156-0.85938 0.1875-1.2266 0.22656-0.36719 0.58984-0.62891 1.0078-0.72656 0.42188-0.09375 0.86328-0.015625 1.2266 0.21875 6.2891 3.8516 12.086 3.9297 17.723 0.23438 0.35547-0.24219 0.78906-0.32812 1.2109-0.24609 0.42188 0.085938 0.78906 0.33594 1.0234 0.69141 0.23438 0.35937 0.31641 0.79687 0.22656 1.2188-0.089844 0.41797-0.34766 0.78125-0.70703 1.0117-3.2969 2.1602-6.6992 3.2383-10.18 3.2383z"/>
      <path d="m62.547 54.188c-0.73438 0.003906-1.375-0.49609-1.5547-1.2031-0.17969-0.71094 0.14453-1.4531 0.78906-1.8008 6.4844-3.5234 9.4492-8.5078 9.0625-15.238-0.023438-0.42578 0.12109-0.83984 0.40234-1.1562 0.28516-0.31641 0.67969-0.51172 1.1055-0.53516 0.87891-0.050781 1.6367 0.625 1.6875 1.5078 0.46094 7.9844-3.1523 14.117-10.73 18.238-0.23438 0.125-0.49609 0.19141-0.76172 0.1875z"/>
    </g>
    <g>
      <path d="m50 18.367c-0.18359 0-0.36719-0.03125-0.53906-0.09375l-6.2539-2.2305 0.003907-0.003907c-0.64063-0.22656-1.0625-0.82812-1.0625-1.5039v-4.5352c0-0.88281 0.71484-1.6016 1.5977-1.6016h12.508c0.42188 0 0.83203 0.17187 1.1289 0.46875 0.30078 0.30078 0.46875 0.70703 0.46875 1.1328v4.5352c0 0.67578-0.42187 1.2773-1.0625 1.5039l-6.2539 2.2305 0.003906 0.003907c-0.17187 0.0625-0.35547 0.09375-0.53906 0.09375zm-4.6523-4.9609 4.6523 1.6602 4.6523-1.6602v-1.8047h-9.3047zm10.906 1.1289z"/>
      <path d="m56.254 83.293h-12.508c-0.88281 0-1.5977-0.71484-1.5977-1.6016v-4.5352c0-0.67578 0.42187-1.2773 1.0625-1.5039l6.2539-2.2305h-0.003906c0.34766-0.125 0.73047-0.125 1.0781 0l6.2539 2.2305h-0.003907c0.64063 0.22656 1.0625 0.82812 1.0625 1.5039v4.5352c0 0.88672-0.71484 1.6016-1.5977 1.6016zm-10.906-3.1992h9.3047v-1.8086l-4.6523-1.6602-4.6523 1.6602z"/>
      <path d="m85.848 53.699h-4.5352c-0.67578 0-1.2812-0.42578-1.5078-1.0625l-2.2305-6.2539v0.003907c-0.125-0.35156-0.125-0.73047 0-1.0781l2.2305-6.2539v0.003906c0.22656-0.64062 0.83203-1.0664 1.5078-1.0664h4.5352c0.42188 0 0.82812 0.17187 1.1289 0.46875 0.30078 0.30078 0.46875 0.70703 0.46875 1.1328v12.508c0 0.42188-0.16797 0.82813-0.46875 1.1289-0.30078 0.30078-0.70703 0.46875-1.1289 0.46875zm-3.4062-3.1992h1.8047v-9.3086h-1.8047l-1.6602 4.6523z"/>
      <path d="m18.688 53.699h-4.5352c-0.88281 0-1.5977-0.71484-1.5977-1.5977v-12.508c0-0.88281 0.71484-1.6016 1.5977-1.6016h4.5352c0.67969 0 1.2852 0.42578 1.5117 1.0625l2.2305 6.2539c0.125 0.34766 0.125 0.72656 0 1.0742l-2.2305 6.2539c-0.22656 0.64062-0.83203 1.0664-1.5117 1.0625zm-2.9336-3.1992h1.8047l1.6602-4.6523-1.6602-4.6562h-1.8047z"/>
      <path d="m77.926 91.602h-55.852c-1.5391 0.019532-3.0234-0.57812-4.1172-1.6602-1.0977-1.082-1.7109-2.5547-1.7109-4.0938 0-1.5391 0.61328-3.0156 1.7109-4.0977 1.0938-1.082 2.5781-1.6758 4.1172-1.6562h55.852c1.5391-0.019531 3.0234 0.57422 4.1172 1.6562 1.0977 1.082 1.7109 2.5586 1.7109 4.0977 0 1.5391-0.61328 3.0117-1.7109 4.0938-1.0938 1.082-2.5781 1.6797-4.1172 1.6602zm-55.852-8.3086c-0.6875-0.011719-1.3477 0.25-1.8398 0.73047-0.48828 0.48047-0.76562 1.1367-0.76562 1.8242 0 0.68359 0.27734 1.3438 0.76562 1.8242 0.49219 0.48047 1.1523 0.74219 1.8398 0.72656h55.852c0.6875 0.015624 1.3477-0.24609 1.8398-0.72656 0.48828-0.48047 0.76562-1.1406 0.76562-1.8242 0-0.6875-0.27734-1.3438-0.76562-1.8242-0.49219-0.48047-1.1523-0.74219-1.8398-0.73047z"/>
      <path d="m50 72.008c-0.91016 0-1.8203-0.046874-2.7227-0.14062h-0.019532c-1.7383-0.17969-3.4492-0.53516-5.1133-1.0586-0.84375-0.26562-1.3125-1.1641-1.0469-2.0078 0.26562-0.83984 1.1641-1.3086 2.0039-1.043 1.457 0.45703 2.9531 0.76563 4.4688 0.92578h0.019532c0.80078 0.082031 1.6055 0.125 2.4102 0.125 2.3398 0 4.668-0.35547 6.8984-1.0547 0.84375-0.26562 1.7422 0.20312 2.0078 1.0469s-0.20312 1.7422-1.0469 2.0078c-2.543 0.79688-5.1953 1.1992-7.8594 1.1992z"/>
      <path d="m70.086 83.293h-40.172c-0.54297 0-1.0469-0.27344-1.3438-0.73047-0.29297-0.45703-0.33984-1.0312-0.11719-1.5273l3.6172-8.0508h0.003907c0.1875-0.41406 0.54297-0.73047 0.97656-0.86719 0.43359-0.13672 0.90625-0.082032 1.3008 0.14844 2.6875 1.5977 5.6055 2.7695 8.6484 3.4805 0.070312-0.039063 0.14062-0.070313 0.21484-0.09375l6.2539-2.2305h-0.003906c0.34766-0.125 0.73047-0.125 1.0781 0l6.2539 2.2305c0.070313 0.023437 0.14062 0.054687 0.21094 0.09375 3.043-0.71094 5.9609-1.8828 8.6445-3.4805 0.39453-0.23047 0.86719-0.28516 1.3008-0.14844 0.43359 0.13672 0.78906 0.45312 0.97656 0.86719l3.6172 8.0508h0.003906c0.22266 0.49609 0.17578 1.0703-0.11719 1.5273-0.29688 0.45703-0.80078 0.73047-1.3438 0.73047zm-37.699-3.1992h35.227l-1.8906-4.1992c-2.8828 1.5117-5.9688 2.5938-9.1602 3.2188-0.66016 0.13281-1.332-0.16797-1.6797-0.74219l-4.8828-1.7461-4.8828 1.7422c-0.34766 0.57812-1.0195 0.875-1.6797 0.74609-3.1914-0.625-6.2773-1.7109-9.1602-3.2227z"/>
    </g>
  </g>
  <g transform="matrix(2.5,0,0,2.5,-2.25,105.5)" fill="#d9d9d9">
    <path d="M1.1 9.9 l0 -0.6 c0 -1.9 1.4 -3.3 3.5 -3.3 l5.5 0 l0 0.9 l-0.4 0.4 l-5.1 0 c-1.1 0 -2 0.9 -2 2 l0 0.6 c0 1.1 0.6 1.68 1.6 1.9 l3.7 0.8 c1.4 0.3 2.5 1.4 2.5 3.2 l0 0.9 c0 1.9 -1.4 3.3 -3.5 3.3 l-6 0 l0 -1.3 l6 0 c1.1 0 2 -0.9 2 -2 l0 -0.9 c0 -1.1 -0.6 -1.68 -1.6 -1.9 l-3.7 -0.8 c-1.4 -0.3 -2.5 -1.4 -2.5 -3.2 z"/>
    <path d="M11.5425 16.9 l0 -7.8 c0 -1.9 1.4 -3.3 3.5 -3.3 l3.5 0 c2.1 0 3.5 1.4 3.5 3.3 l0 7.8 c0 1.9 -1.4 3.3 -3.5 3.3 l-3.5 0 c-2.1 0 -3.5 -1.4 -3.5 -3.3 z M20.5425 16.9 l0 -7.8 c0 -1.1 -0.9 -2 -2 -2 l-3.5 0 c-1.1 0 -2 0.9 -2 2 l0 7.8 c0 1.1 0.9 2 2 2 l3.5 0 c1.1 0 2 -0.9 2 -2 z"/>
    <path d="M24.285 6 l1.5 0 l0 12.7 l7.5 0 l0 1.3 l-9 0 l0 -14 z"/>
    <path d="M33.7275 16.9 l0 -7.8 c0 -1.9 1.4 -3.3 3.5 -3.3 l3.5 0 c2.1 0 3.5 1.4 3.5 3.3 l0 7.8 c0 1.9 -1.4 3.3 -3.5 3.3 l-3.5 0 c-2.1 0 -3.5 -1.4 -3.5 -3.3 z M42.7275 16.9 l0 -7.8 c0 -1.1 -0.9 -2 -2 -2 l-3.5 0 c-1.1 0 -2 0.9 -2 2 l0 7.8 c0 1.1 0.9 2 2 2 l3.5 0 c1.1 0 2 -0.9 2 -2 z"/>
    <path d="M46.47 20 l0 -14 l6.4 0 c2.1 0 3.5 1.4 3.5 3.3 l0 7.4 c0 1.9 -1.4 3.3 -3.5 3.3 l-6.4 0 z M47.97 7.3 l0 11.4 l4.9 0 c1.1 0 2 -0.9 2 -2 l0 -7.4 c0 -1.1 -0.9 -2 -2 -2 l-4.9 0 z"/>
    <path d="M58.6125 20 l0 -14 l9.1 0 l0 0.9 l-0.4 0.4 l-7.2 0 l0 4.9 l5.7 0 l0 1.3 l-5.7 0 l0 5.2 l7.6 0 l0 1.3 l-9.1 0 z"/>
    <path d="M72.755 18.2 l0.1 0 l4 -12.2 l1.5 0 l0 0.6 l-4.6 13.4 l-1.9 0 l-4.6 -13.4 l0 -0.6 l1.5 0 z"/>
  </g>
  <g transform="matrix(2.549377593360996,0,0,2.549377593360996,198.31950,104.51452)" fill="url(#logo-grad-accent)">
    <path d="M3.212891 20.195313 c-0.742187 0 -1.376953 -0.615234 -1.376953 -1.367187 s0.634766 -1.376953 1.376953 -1.376953 c0.751953 0 1.376953 0.625 1.376953 1.376953 s-0.625 1.367188 -1.376953 1.367188 z"/>
    <path d="M17.56836 20 l-1.103516 -3.095703 l-6.083984 0 l-1.09375 3.095703 l-2.412109 0 l5.126953 -13.925781 l2.841797 0 l5.126953 13.925781 l-2.402344 0 z M11.09375 14.902344 l4.667969 0 l-2.333984 -6.582031 z"/>
    <path d="M22.41211 20 l0 -13.925781 l2.333984 0 l0 13.925781 l-2.333984 0 z"/>
  </g>
</svg>`;

const methodColor = (m: string) => {
  switch (m) {
    case "GET": return "#10b981";
    case "POST": return "#3b82f6";
    case "PUT": return "#f59e0b";
    case "PATCH": return "#8b5cf6";
    case "DELETE": return "#ef4444";
    default: return "#6b7280";
  }
};

const renderHtml = () => {
  const navItems = sections
    .map((s) => `<a href="#${s.id}" class="nav-item"><span class="nav-icon">${icon(s.icon, 18)}</span><span>${s.title}</span></a>`)
    .join("");

  const sectionsHtml = sections
    .map(
      (s) => `
    <section id="${s.id}" class="section card">
      <div class="card-sheen"></div>
      <div class="card-inner">
        <h2><span class="section-icon">${icon(s.icon, 22)}</span>${s.title}</h2>
        <p class="section-desc">${s.description}</p>
        <div class="endpoints">
          ${s.endpoints
            .map(
              (e) => `
            <div class="endpoint">
              <span class="method" style="background:${methodColor(e.method)}">${e.method}</span>
              <code class="path">${e.path}</code>
              <span class="desc">${e.description}</span>
              ${e.auth ? `<span class="auth-badge" title="Requer autenticação Bearer">${icon("lock", 14)}</span>` : ""}
            </div>`,
            )
            .join("")}
        </div>
      </div>
      <div class="card-glow-bottom"></div>
      <div class="card-glow-blob"></div>
    </section>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SoloDev.AI — API Docs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg: #000;
      --text: #e5e7eb;
      --text-dim: #a1a1aa;
      --text-muted: #71717a;
      --violet: #8b5cf6;
      --violet-400: #a78bfa;
      --violet-500: #8b5cf6;
      --violet-600: #7c3aed;
      --border: rgba(255, 255, 255, 0.05);
      --card-bg: rgba(255, 255, 255, 0.04);
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    /* Ambient background matching AuthLayout — dark with violet glows */
    body::before {
      content: "";
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse at 20% 10%, rgba(139, 92, 246, 0.18), transparent 50%),
        radial-gradient(ellipse at 80% 90%, rgba(124, 58, 237, 0.12), transparent 55%),
        radial-gradient(ellipse at 50% 50%, rgba(88, 28, 135, 0.08), transparent 70%);
      pointer-events: none;
    }
    body::after {
      content: "";
      position: fixed; inset: 0; z-index: 0;
      background: rgba(0, 0, 0, 0.5);
      pointer-events: none;
    }

    .layout {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 280px 1fr;
      min-height: 100vh;
    }

    /* Sidebar — glass card treatment */
    aside {
      position: sticky; top: 0; height: 100vh;
      padding: 2rem 1.25rem;
      overflow-y: auto;
      border-right: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.02);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .brand-wrap {
      display: flex; flex-direction: column; align-items: center;
      padding: 0.5rem 0.85rem 1.75rem;
      position: relative;
    }
    .brand-glow {
      position: absolute; inset: -10px -10px 35%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, rgba(124, 58, 237, 0.25) 45%, transparent 70%);
      filter: blur(32px);
      opacity: 0.55;
      pointer-events: none;
      animation: pulse 2.2s ease-in-out infinite alternate;
      z-index: 0;
    }
    @keyframes pulse {
      from { opacity: 0.45; transform: scale(1); }
      to { opacity: 0.7; transform: scale(1.12); }
    }
    .solodev-logo {
      position: relative;
      width: 160px; height: auto;
      display: block;
      animation: float 2.8s ease-in-out infinite alternate;
      z-index: 1;
    }
    @keyframes float {
      from { transform: translateY(0); }
      to { transform: translateY(-6px); }
    }
    .solodev-logo .logo-iris {
      transform-box: fill-box;
      transform-origin: center;
      animation: iris-pulse 2.4s ease-in-out infinite alternate;
    }
    @keyframes iris-pulse {
      from { opacity: 0.55; }
      to { opacity: 1; }
    }
    .brand-sub {
      position: relative;
      font-size: 0.68rem; color: var(--text-muted);
      margin-top: 0.85rem; text-transform: uppercase; letter-spacing: 0.18em;
      font-weight: 500;
      text-align: center;
      z-index: 1;
    }
    nav { display: flex; flex-direction: column; gap: 0.15rem; margin-top: 0.5rem; }
    .nav-item {
      display: flex; align-items: center; gap: 0.7rem;
      padding: 0.6rem 0.85rem;
      border-radius: 0.6rem;
      color: var(--text-dim);
      text-decoration: none;
      font-size: 0.88rem; font-weight: 500;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    .nav-item:hover {
      color: #fff;
      background: rgba(139, 92, 246, 0.08);
      border-color: rgba(139, 92, 246, 0.15);
      transform: translateX(3px);
    }
    .nav-icon { display: inline-flex; color: var(--violet-400); }
    .nav-item:hover .nav-icon { color: var(--violet-500); }
    .section-icon { display: inline-flex; color: var(--violet-400); }
    .auth-badge { display: inline-flex; color: var(--violet-400); opacity: 0.8; cursor: help; }

    /* Main content */
    main {
      padding: 3.5rem 3rem;
      max-width: 960px;
      width: 100%;
      margin: 0 auto;
    }
    .hero { text-align: center; }
    .hero p { margin-left: auto; margin-right: auto; }
    .meta { justify-content: center; }

    /* Hero — glass card */
    .hero {
      position: relative;
      margin-bottom: 2.5rem;
      padding: 2.5rem 2rem;
      border-radius: 1rem;
      border: 1px solid var(--border);
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px rgba(139, 92, 246, 0.08);
      overflow: hidden;
      animation: card-glow 2.5s ease-in-out infinite alternate;
    }
    @keyframes card-glow {
      from { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0px rgba(139, 92, 246, 0); }
      to { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 24px rgba(139, 92, 246, 0.18), 0 0 48px rgba(139, 92, 246, 0.08); }
    }
    /* Diagonal sheen — matches Login card */
    .hero::before {
      content: "";
      position: absolute;
      top: -50%; left: -25%;
      height: 200%; width: 60%;
      transform: rotate(25deg);
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02), transparent);
      pointer-events: none;
    }
    /* Bottom violet glow */
    .hero::after {
      content: "";
      position: absolute;
      inset-inline: 0; bottom: 0;
      height: 7rem;
      background: linear-gradient(to top, rgba(124, 58, 237, 0.1), rgba(168, 85, 247, 0.05), transparent);
      pointer-events: none;
    }
    .hero-inner { position: relative; z-index: 1; }
    .hero h1 {
      font-size: 2.5rem; font-weight: 800; margin-bottom: 0.85rem;
      letter-spacing: -0.03em;
      background: linear-gradient(135deg, #fff 0%, #a78bfa 60%, #7c3aed 100%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }
    .hero p {
      color: var(--text-dim); font-size: 1rem; max-width: 680px;
      line-height: 1.7;
    }
    .meta { display: flex; gap: 0.6rem; margin-top: 1.5rem; flex-wrap: wrap; }
    .badge {
      padding: 0.4rem 0.85rem; border-radius: 999px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 0.75rem; color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
    }
    .badge strong {
      color: var(--violet-400); margin-left: 0.4rem; font-weight: 600;
    }

    /* Section cards — same glass treatment */
    .card {
      position: relative;
      margin-bottom: 1.5rem;
      border-radius: 1rem;
      border: 1px solid var(--border);
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      scroll-margin-top: 1.5rem;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .card:hover {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), 0 0 24px rgba(139, 92, 246, 0.15);
    }
    .card-sheen {
      position: absolute;
      top: -50%; left: -25%;
      height: 200%; width: 60%;
      transform: rotate(25deg);
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02), transparent);
      pointer-events: none; z-index: 0;
    }
    .card-glow-bottom {
      position: absolute; inset-inline: 0; bottom: 0;
      height: 5rem;
      background: linear-gradient(to top, rgba(124, 58, 237, 0.08), transparent);
      pointer-events: none;
    }
    .card-glow-blob {
      position: absolute;
      bottom: -1.5rem; left: 50%;
      height: 3rem; width: 66%;
      transform: translateX(-50%);
      background: rgba(139, 92, 246, 0.15);
      filter: blur(32px);
      border-radius: 999px;
      pointer-events: none;
    }
    .card-inner {
      position: relative; z-index: 1;
      padding: 2rem 2rem 2.25rem;
    }
    .section h2 {
      font-size: 1.4rem; font-weight: 700; margin-bottom: 0.4rem;
      display: flex; align-items: center; gap: 0.75rem;
      letter-spacing: -0.01em;
      color: #fff;
    }
    .section-desc {
      color: var(--text-dim); margin-bottom: 1.25rem;
      font-size: 0.9rem;
    }
    .endpoints { display: flex; flex-direction: column; gap: 0.45rem; }
    .endpoint {
      display: flex; align-items: center; gap: 0.85rem;
      padding: 0.7rem 0.9rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 0.6rem;
      transition: all 0.2s ease;
    }
    .endpoint:hover {
      background: rgba(139, 92, 246, 0.06);
      border-color: rgba(139, 92, 246, 0.25);
      transform: translateX(2px);
    }
    .method {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; font-weight: 700;
      padding: 0.3rem 0.55rem; border-radius: 0.35rem;
      color: #fff; min-width: 62px; text-align: center;
      letter-spacing: 0.05em;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
    .path {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem; color: #fff;
      font-weight: 500;
    }
    .desc { color: var(--text-muted); font-size: 0.85rem; flex: 1; }

    footer {
      margin-top: 3rem; padding: 1.5rem 0;
      border-top: 1px solid var(--border);
      color: var(--text-muted); font-size: 0.82rem;
      display: flex; justify-content: space-between;
      flex-wrap: wrap; gap: 1rem;
    }
    footer a {
      color: var(--violet-400); text-decoration: none;
      transition: color 0.15s ease;
    }
    footer a:hover { color: var(--violet-500); }
    .footer-note { display: inline-flex; align-items: center; gap: 0.4rem; }
    .footer-note svg { color: var(--violet-400); }

    @media (max-width: 900px) {
      .layout { grid-template-columns: 1fr; }
      aside {
        position: relative; height: auto;
        border-right: none; border-bottom: 1px solid var(--border);
      }
      main { padding: 2rem 1.25rem; }
      .hero { padding: 1.75rem 1.25rem; }
      .hero h1 { font-size: 1.85rem; }
      .card-inner { padding: 1.5rem 1.25rem; }
      .endpoint { flex-wrap: wrap; }
      .desc { flex-basis: 100%; margin-left: 0; }
    }
  </style>
</head>
<body>
  <div class="layout">
    <aside>
      <div class="brand-wrap">
        <div class="brand-glow"></div>
        ${SOLODEV_LOGO_SVG}
        <div class="brand-sub">API Reference</div>
      </div>
      <nav>${navItems}</nav>
    </aside>
    <main>
      <div class="hero">
        <div class="hero-inner">
          <h1>API Documentation</h1>
          <p>Referência completa da API REST do SoloDev.AI — plataforma freemium de aprendizado de desenvolvimento assistido por IA com gamificação RPG.</p>
          <div class="meta">
            <span class="badge">Base URL<strong>/api</strong></span>
            <span class="badge">Auth<strong>Bearer JWT</strong></span>
            <span class="badge">Version<strong>1.0.0</strong></span>
            <span class="badge">Format<strong>JSON</strong></span>
          </div>
        </div>
      </div>
      ${sectionsHtml}
      <footer>
        <span class="footer-note">${icon("lock", 14)} indica endpoints que exigem autenticação Bearer.</span>
        <span><a href="/api/docs.json">Versão JSON</a> · <a href="/api/health">Health</a> · <a href="/">Status</a></span>
      </footer>
    </main>
  </div>
</body>
</html>`;
};

router.get("/docs", (_req, res) => {
  res.type("html").send(renderHtml());
});

router.get("/docs.json", (_req, res) => {
  res.json({ success: true, data: { version: "1.0.0", baseUrl: "/api", sections } });
});

export default router;
