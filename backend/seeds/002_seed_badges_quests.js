/**
 * Seed: badges e quests do sistema de gamificacao
 * @param {import('knex').Knex} knex
 */
export async function seed(knex) {
  await knex("user_quests").del();
  await knex("user_badges").del();
  await knex("quests").del();
  await knex("badges").del();

  // === Badges ===
  await knex("badges").insert([
    { slug: "first_prompt", name: "Primeiro Prompt", description: "Completou seu primeiro treino na Sala de Treinamento", rank_tier: "E" },
    { slug: "first_deploy", name: "First Deploy", description: "Publicou seu primeiro projeto", rank_tier: "C" },
    { slug: "auth_specialist", name: "Auth Specialist", description: "Completou o Dungeon Auth Fortress", rank_tier: "B" },
    { slug: "gate_opener", name: "Gate Opener", description: "Completou o projeto livre The Gate", rank_tier: "A" },
    { slug: "shadow_monarch", name: "Shadow Monarch", description: "Alcançou o S-Rank", rank_tier: "S" },
    { slug: "persistent_hunter", name: "Persistent Hunter", description: "Manteve um combo de 7 dias consecutivos", rank_tier: "E" },
    { slug: "open_source_hunter", name: "Open Source Hunter", description: "Publicou um projeto no GitHub", rank_tier: "D" },
    { slug: "team_player", name: "Team Player", description: "Criou seu primeiro Pull Request", rank_tier: "D" },
    { slug: "prompt_master", name: "Prompt Master", description: "Atingiu score 90+ na Sala de Treinamento", rank_tier: "D" },
  ]);

  // Get badge IDs for quest references
  const badges = await knex("badges").select("id", "slug");
  const badgeMap = Object.fromEntries(badges.map((b) => [b.slug, b.id]));

  // === Quests ===
  await knex("quests").insert([
    // Main quests
    { slug: "setup_arsenal", title: "Configurar o arsenal", description: "Configure Node.js, Git, VS Code e Claude Code", type: "main", xp_reward: 200, badge_id: null },
    { slug: "first_dungeon", title: "Primeiro dungeon conquistado", description: "Complete o Dungeon Task Realm", type: "main", xp_reward: 500, badge_id: badgeMap.first_deploy },
    { slug: "open_the_gate", title: "Abrir o Gate", description: "Complete o projeto livre The Gate", type: "main", xp_reward: 1000, badge_id: badgeMap.gate_opener },

    // Daily quests
    { slug: "daily_prompt", title: "Treino no Lab", description: "Complete 1 treino na Sala de Treinamento", type: "daily", xp_reward: 30, badge_id: null, reset_daily: true },
    { slug: "daily_lesson", title: "Missão do dia", description: "Assista 1 aula hoje", type: "daily", xp_reward: 20, badge_id: null, reset_daily: true },

    // Side quests
    { slug: "publish_github", title: "Publicar no GitHub", description: "Publique um projeto no GitHub", type: "side", xp_reward: 150, badge_id: badgeMap.open_source_hunter },
    { slug: "streak_7_days", title: "Streak de 7 dias", description: "Mantenha um combo de 7 dias consecutivos", type: "side", xp_reward: 300, badge_id: badgeMap.persistent_hunter },
    { slug: "first_pr", title: "Primeiro PR", description: "Crie seu primeiro Pull Request", type: "side", xp_reward: 100, badge_id: badgeMap.team_player },
  ]);
}
