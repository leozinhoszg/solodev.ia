/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_badges", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("badge_id").unsigned().notNullable();
    t.timestamp("earned_at").defaultTo(knex.fn.now());

    t.unique(["user_id", "badge_id"]);
    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.foreign("badge_id").references("id").inTable("badges");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_badges");
}
