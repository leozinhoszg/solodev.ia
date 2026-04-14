/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_attributes", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().unique().notNullable();
    t.tinyint("prompt_mastery").defaultTo(0);
    t.tinyint("frontend_power").defaultTo(0);
    t.tinyint("backend_strength").defaultTo(0);
    t.tinyint("db_knowledge").defaultTo(0);
    t.tinyint("security_level").defaultTo(0);
    t.tinyint("deploy_speed").defaultTo(0);
    t.timestamp("updated_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_attributes");
}
