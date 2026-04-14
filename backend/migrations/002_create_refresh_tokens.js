/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("refresh_tokens", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.string("token", 512).unique().notNullable();
    t.timestamp("expires_at").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("refresh_tokens");
}
