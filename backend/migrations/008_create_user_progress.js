/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_progress", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("lesson_id").unsigned().notNullable();
    t.boolean("completed").defaultTo(false);
    t.timestamp("completed_at").nullable();

    t.unique(["user_id", "lesson_id"]);
    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.foreign("lesson_id").references("id").inTable("lessons");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_progress");
}
