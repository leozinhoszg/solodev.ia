/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_onboarding", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().unique().notNullable();
    t.enu("level", ["beginner", "some_notion", "professional"]).notNullable();
    t.enu("goal", ["own_business", "portfolio", "saas", "not_sure"]).notNullable();
    t.tinyint("weekly_hours").notNullable();
    t.timestamp("completed_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_onboarding");
}
