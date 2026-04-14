/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("lessons", (t) => {
    t.increments("id").primary();
    t.integer("module_id").unsigned().notNullable();
    t.string("title", 200).notNullable();
    t.enu("video_provider", ["bunny"]).defaultTo("bunny");
    t.string("video_id", 255).nullable();
    t.string("video_url", 500).nullable();
    t.integer("duration_s").nullable();
    t.integer("xp_reward").defaultTo(20);
    t.integer("order_index").notNullable();

    t.foreign("module_id").references("id").inTable("modules");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("lessons");
}
