/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_streaks", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().unique().notNullable();
    t.integer("current_streak").defaultTo(0);
    t.integer("longest_streak").defaultTo(0);
    t.date("last_activity").nullable();

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_streaks");
}
