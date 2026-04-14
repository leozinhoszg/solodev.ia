/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("courses", (t) => {
    t.increments("id").primary();
    t.string("title", 200).notNullable();
    t.enu("rank_required", ["E", "D", "C", "B", "A", "S"]).defaultTo("E");
    t.enu("plan_required", ["free", "pro"]).defaultTo("free");
    t.integer("order_index").notNullable();
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("courses");
}
