/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("subscriptions", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.enu("provider", ["stripe", "pagarme"]).notNullable();
    t.string("provider_customer_id", 255).nullable();
    t.string("provider_sub_id", 255).nullable();
    t.enu("status", ["active", "cancelled", "past_due", "trialing"]).notNullable();
    t.enu("plan", ["pro"]).defaultTo("pro");
    t.timestamp("current_period_start").notNullable();
    t.timestamp("current_period_end").notNullable();
    t.boolean("cancel_at_period_end").defaultTo(false);
    t.timestamps(true, true);

    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("subscriptions");
}
