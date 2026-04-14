/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("quests", (t) => {
    t.increments("id").primary();
    t.string("slug", 100).unique().notNullable();
    t.string("title", 200).notNullable();
    t.text("description").nullable();
    t.enu("type", ["main", "daily", "side"]).notNullable();
    t.integer("xp_reward").notNullable();
    t.integer("badge_id").unsigned().nullable();
    t.boolean("reset_daily").defaultTo(false);

    t.foreign("badge_id").references("id").inTable("badges").onDelete("SET NULL");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("quests");
}
