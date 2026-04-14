/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("badges", (t) => {
    t.increments("id").primary();
    t.string("slug", 100).unique().notNullable();
    t.string("name", 150).notNullable();
    t.text("description").nullable();
    t.enu("rank_tier", ["E", "D", "C", "B", "A", "S"]).defaultTo("E");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("badges");
}
