/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("payment_events", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().nullable();
    t.integer("subscription_id").unsigned().nullable();
    t.string("event_type", 100).notNullable();
    t.enu("provider", ["stripe", "pagarme"]).notNullable();
    t.string("provider_event_id", 255).unique().nullable();
    t.json("payload").nullable();
    t.timestamp("processed_at").defaultTo(knex.fn.now());

    t.foreign("user_id").references("id").inTable("users").onDelete("SET NULL");
    t.foreign("subscription_id").references("id").inTable("subscriptions").onDelete("SET NULL");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("payment_events");
}
