/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_dungeon_checkpoints", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("checkpoint_id").unsigned().notNullable();
    t.boolean("checked").defaultTo(false);
    t.timestamp("checked_at").nullable();

    t.unique(["user_id", "checkpoint_id"]);
    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.foreign("checkpoint_id").references("id").inTable("dungeon_checkpoints");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_dungeon_checkpoints");
}
