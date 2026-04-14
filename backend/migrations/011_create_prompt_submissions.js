/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("prompt_submissions", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("lesson_id").unsigned().nullable();
    t.text("prompt_text").notNullable();
    t.tinyint("score").nullable();
    t.text("feedback").nullable();
    t.text("optimized_prompt").nullable();
    t.integer("xp_earned").defaultTo(0);
    t.timestamp("created_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.foreign("lesson_id").references("id").inTable("lessons").onDelete("SET NULL");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("prompt_submissions");
}
