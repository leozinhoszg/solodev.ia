/**
 * @param {import('knex').Knex} knex
 */
export function up(knex) {
  return knex.schema.createTable("user_quests", (t) => {
    t.increments("id").primary();
    t.integer("user_id").unsigned().notNullable();
    t.integer("quest_id").unsigned().notNullable();
    t.boolean("completed").defaultTo(false);
    t.timestamp("completed_at").nullable();

    t.unique(["user_id", "quest_id"]);
    t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.foreign("quest_id").references("id").inTable("quests");
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export function down(knex) {
  return knex.schema.dropTable("user_quests");
}
