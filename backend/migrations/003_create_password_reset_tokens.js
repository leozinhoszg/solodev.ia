/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("password_reset_tokens", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.string("token", 255).unique().notNullable();
    t.boolean("used").defaultTo(false);
    t.timestamp("expires_at").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("password_reset_tokens");
}
