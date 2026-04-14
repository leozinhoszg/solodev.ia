/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("dungeons", (t) => {
    t.increments("id").primary();
    t.string("slug", 100).unique().notNullable();
    t.string("title", 200).notNullable();
    t.enu("rank_required", ["C", "B", "A", "S"]).notNullable();
    t.text("description").nullable();
    t.integer("xp_reward").notNullable();
    t.integer("badge_id").unsigned().nullable();

    t.foreign("badge_id").references("id").inTable("badges").onDelete("SET NULL");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("dungeons");
}
