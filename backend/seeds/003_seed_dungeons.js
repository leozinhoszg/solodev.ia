/**
 * Seed: Dungeons (projetos guiados)
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("user_dungeon_checkpoints").del();
  await knex("user_dungeons").del();
  await knex("dungeon_checkpoints").del();
  await knex("dungeons").del();

  const badges = await knex("badges").select("id", "slug");
  const badgeMap = Object.fromEntries(badges.map((b) => [b.slug, b.id]));

  // === Dungeon 1 — Task Realm (C-Rank) ===
  const [d1Id] = await knex("dungeons").insert({
    slug: "task-realm",
    title: "Task Realm",
    rank_required: "C",
    description: "Construa um sistema de tarefas full stack do zero. Crie o PRD, implemente backend com API REST, frontend com interface de CRUD e banco de dados com Prisma.",
    xp_reward: 500,
    badge_id: badgeMap.first_deploy,
  });
  await knex("dungeon_checkpoints").insert([
    { dungeon_id: d1Id, description: "PRD e plano.md criados e revisados", order_index: 1 },
    { dungeon_id: d1Id, description: "API de tarefas funcionando (CRUD completo)", order_index: 2 },
    { dungeon_id: d1Id, description: "Interface de criação e listagem de tarefas", order_index: 3 },
    { dungeon_id: d1Id, description: "Projeto testado e bugs corrigidos", order_index: 4 },
  ]);

  // === Dungeon 2 — Auth Fortress (B-Rank) ===
  const [d2Id] = await knex("dungeons").insert({
    slug: "auth-fortress",
    title: "Auth Fortress",
    rank_required: "B",
    description: "Construa um sistema de autenticação completo com JWT, Argon2, upload de avatar e dashboard protegido.",
    xp_reward: 750,
    badge_id: badgeMap.auth_specialist,
  });
  await knex("dungeon_checkpoints").insert([
    { dungeon_id: d2Id, description: "Registro e login funcionando com Argon2 + JWT", order_index: 1 },
    { dungeon_id: d2Id, description: "Refresh token com rotação e HttpOnly cookie", order_index: 2 },
    { dungeon_id: d2Id, description: "Dashboard protegido com perfil do usuário", order_index: 3 },
    { dungeon_id: d2Id, description: "Upload de imagem de perfil funcionando", order_index: 4 },
    { dungeon_id: d2Id, description: "Rate limiting e proteção CORS configurados", order_index: 5 },
  ]);

  // === Dungeon 3 — The Gate (A-Rank, projeto livre) ===
  const [d3Id] = await knex("dungeons").insert({
    slug: "the-gate",
    title: "The Gate",
    rank_required: "A",
    description: "Defina sua própria ideia de aplicação, crie o PRD, execute com PREVC e publique no GitHub com domínio próprio.",
    xp_reward: 1500,
    badge_id: badgeMap.gate_opener,
  });
  await knex("dungeon_checkpoints").insert([
    { dungeon_id: d3Id, description: "Ideia definida e PRD aprovado", order_index: 1 },
    { dungeon_id: d3Id, description: "Planejamento PREVC completo (plano.md)", order_index: 2 },
    { dungeon_id: d3Id, description: "Backend funcional com API documentada", order_index: 3 },
    { dungeon_id: d3Id, description: "Frontend funcional e responsivo", order_index: 4 },
    { dungeon_id: d3Id, description: "App publicado com domínio personalizado", order_index: 5 },
    { dungeon_id: d3Id, description: "Repositório público no GitHub", order_index: 6 },
  ]);
}
