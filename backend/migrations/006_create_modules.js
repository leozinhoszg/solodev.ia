/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("modules", (t) => {
    t.increments("id").primary();
    t.integer("course_id").unsigned().notNullable();
    t.string("title", 200).notNullable();
    t.integer("order_index").notNullable();

    t.foreign("course_id").references("id").inTable("courses");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("modules");
}
