import knex from "knex";
export const config = {
    client: "sqlite3",
    connection: {
        filename: "./db/app.db",
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        directory: "./db/migrations",
    },
};
export const database = knex(config);
