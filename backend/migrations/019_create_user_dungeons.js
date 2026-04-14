/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_dungeons", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("dungeon_id").unsigned().notNullable();
    t.enu("status", ["not_started", "in_progress", "completed"]).defaultTo("not_started");
    t.timestamp("started_at").nullable();
    t.timestamp("completed_at").nullable();

    t.unique(["user_id", "dungeon_id"]);
    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.foreign("dungeon_id").references("id").inTable("dungeons");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_dungeons");
}
