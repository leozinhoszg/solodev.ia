/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary();
    t.string("name", 100).notNullable();
    t.string("email", 150).unique().notNullable();
    t.string("password", 255).notNullable();
    t.string("avatar_url", 500).nullable();
    t.enu("plan", ["free", "pro"]).defaultTo("free");
    t.timestamp("plan_expires_at").nullable();
    t.enu("current_rank", ["E", "D", "C", "B", "A", "S"]).defaultTo("E");
    t.integer("total_xp").defaultTo(0);
    t.timestamps(true, true);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("users");
}
