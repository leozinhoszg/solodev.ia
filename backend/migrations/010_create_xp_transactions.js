/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("xp_transactions", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("amount").notNullable();
    t.enu("source", ["lesson", "prompt_lab", "quest", "dungeon", "streak_bonus"]).notNullable();
    t.integer("source_id").nullable();
    t.string("description", 255).nullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("xp_transactions");
}
