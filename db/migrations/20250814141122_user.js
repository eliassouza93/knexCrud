"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('user', (t) => {
        t.uuid('id').primary();
        t.text('name').notNullable();
        t.text('password').notNullable();
        t.text('task').notNullable();
    });
}
async function down(knex) {
    await knex.schema.dropTable('user');
}
