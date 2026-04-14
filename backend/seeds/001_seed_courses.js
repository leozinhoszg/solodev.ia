/**
 * Seed: Fase 1 — Fundamentos e ambiente (gratuito)
 * + Fase 2 Módulos 1-2 (gratuitos)
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  // Clean tables in reverse order
  await knex("lessons").del();
  await knex("modules").del();
  await knex("courses").del();

  // === FASE 1 — E-Rank (Free) ===
  const [fase1Id] = await knex("courses").insert({
    title: "Fase 1 — Fundamentos e Ambiente",
    rank_required: "E",
    plan_required: "free",
    order_index: 1,
  });

  // Módulo 1
  const [mod1Id] = await knex("modules").insert({
    course_id: fase1Id,
    title: "O que é desenvolvimento de software",
    order_index: 1,
  });
  await knex("lessons").insert([
    { module_id: mod1Id, title: "Frontend, backend e banco de dados", duration_s: 600, xp_reward: 20, order_index: 1 },
    { module_id: mod1Id, title: "O papel da IA no desenvolvimento moderno", duration_s: 480, xp_reward: 20, order_index: 2 },
    { module_id: mod1Id, title: "Como funciona um projeto de software (PREVC)", duration_s: 720, xp_reward: 20, order_index: 3 },
  ]);

  // Módulo 2
  const [mod2Id] = await knex("modules").insert({
    course_id: fase1Id,
    title: "Configurando o ambiente de trabalho",
    order_index: 2,
  });
  await knex("lessons").insert([
    { module_id: mod2Id, title: "Instalando Node.js, Git e VS Code", duration_s: 900, xp_reward: 20, order_index: 1 },
    { module_id: mod2Id, title: "Extensões essenciais do VS Code", duration_s: 600, xp_reward: 20, order_index: 2 },
    { module_id: mod2Id, title: "Instalando e autenticando o Claude Code", duration_s: 720, xp_reward: 20, order_index: 3 },
    { module_id: mod2Id, title: "Exercício: terminal rodando + Claude Code autenticado", duration_s: 300, xp_reward: 30, order_index: 4 },
  ]);

  // Módulo 3
  const [mod3Id] = await knex("modules").insert({
    course_id: fase1Id,
    title: "Primeiro contato com o terminal",
    order_index: 3,
  });
  await knex("lessons").insert([
    { module_id: mod3Id, title: "Comandos essenciais: cd, ls, mkdir, npm", duration_s: 600, xp_reward: 20, order_index: 1 },
    { module_id: mod3Id, title: "O que é um package.json e para que serve", duration_s: 480, xp_reward: 20, order_index: 2 },
    { module_id: mod3Id, title: "Git básico: init, add, commit", duration_s: 720, xp_reward: 20, order_index: 3 },
  ]);

  // Módulo 4
  const [mod4Id] = await knex("modules").insert({
    course_id: fase1Id,
    title: "Primeira geração de código com IA",
    order_index: 4,
  });
  await knex("lessons").insert([
    { module_id: mod4Id, title: "Seu primeiro prompt: criando uma página HTML", duration_s: 600, xp_reward: 20, order_index: 1 },
    { module_id: mod4Id, title: "Lendo e entendendo o código gerado", duration_s: 480, xp_reward: 20, order_index: 2 },
    { module_id: mod4Id, title: "Projeto: página de apresentação pessoal com IA", duration_s: 900, xp_reward: 50, order_index: 3 },
    { module_id: mod4Id, title: "Revisão final e entrega do projeto E-Rank", duration_s: 600, xp_reward: 30, order_index: 4 },
  ]);

  // === FASE 2 — D-Rank (Módulos 1-2 Free, 3-5 Pro) ===
  const [fase2Id] = await knex("courses").insert({
    title: "Fase 2 — Conceitos de Programação com IA",
    rank_required: "D",
    plan_required: "free",
    order_index: 2,
  });

  // Módulo 1 (Free)
  const [mod5Id] = await knex("modules").insert({
    course_id: fase2Id,
    title: "Estrutura de prompts eficazes",
    order_index: 1,
  });
  await knex("lessons").insert([
    { module_id: mod5Id, title: "O que faz um bom prompt: contexto, objetivo e restrições", duration_s: 720, xp_reward: 25, order_index: 1 },
    { module_id: mod5Id, title: "Prompts para frontend: layout, componentes e estilo", duration_s: 600, xp_reward: 25, order_index: 2 },
    { module_id: mod5Id, title: "Prompts para backend: rotas, lógica e validações", duration_s: 600, xp_reward: 25, order_index: 3 },
    { module_id: mod5Id, title: "Prompts para banco de dados: modelagem e queries", duration_s: 600, xp_reward: 25, order_index: 4 },
  ]);

  // Módulo 2 (Free)
  const [mod6Id] = await knex("modules").insert({
    course_id: fase2Id,
    title: "Planejamento com a metodologia PREVC",
    order_index: 2,
  });
  await knex("lessons").insert([
    { module_id: mod6Id, title: "O que é um PRD e como criar o seu", duration_s: 720, xp_reward: 25, order_index: 1 },
    { module_id: mod6Id, title: "Quebrando o projeto em fases e tarefas (plano.md)", duration_s: 600, xp_reward: 25, order_index: 2 },
    { module_id: mod6Id, title: "O que delegar à IA e o que é responsabilidade sua", duration_s: 600, xp_reward: 25, order_index: 3 },
  ]);
}
