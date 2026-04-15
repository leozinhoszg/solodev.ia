/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.alterTable("users", (t) => {
    t.enu("role", ["user", "admin"]).defaultTo("user").after("plan");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.alterTable("users", (t) => {
    t.dropColumn("role");
  });
}
