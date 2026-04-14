/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("dungeon_checkpoints", (t) => {
    t.increments("id").primary();
    t.integer("dungeon_id").unsigned().notNullable();
    t.string("description", 300).notNullable();
    t.integer("order_index").notNullable();

    t.foreign("dungeon_id").references("id").inTable("dungeons");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("dungeon_checkpoints");
}
