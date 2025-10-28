import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', (t) => {
        t.uuid('id').primary()
        t.text('name').notNullable()
        t.text('password').notNullable()
        t.text('task').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user')
}

