import { database } from "../database.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
const knex = database;
export class ControllerUser {
    async index(req, res, next) {
        try {
            const retornoAll = await knex("user").select("*");
            res.status(200).json(retornoAll);
        }
        catch (error) {
            next(error);
        }
    }
    async criaUser(req, res, next) {
        try {
            const { name, password, task } = req.body;
            if (!name || !password || !task) {
                return res
                    .status(400)
                    .json({ message: "Name, password and task are required" });
            }
            const id = crypto.randomUUID();
            const senhaHash = await bcrypt.hash(password, 10);
            await knex("user").insert({ id, name, password: senhaHash, task });
            return res
                .status(201)
                .json({ message: `usuário ${name} criado com sucesso ` });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar usuário" });
        }
    }
    async pegaUserPorId(req, res, next) {
        try {
            const { id } = req.params;
            const getUser = await knex("user").where({ id }).first();
            res.status(201).json(getUser);
        }
        catch (error) {
            next(error);
        }
    }
    async editaUser(req, res, next) {
        try {
            const { id } = req.params;
            const { name, task } = req.body;
            const userEditado = await knex("user")
                .where({ id })
                .update({ name, task });
            res.status(201).json(userEditado);
        }
        catch (error) {
            next(error);
        }
    }
    async deletaUser(req, res, next) {
        try {
            const { id } = req.params;
            await knex("user").where({ id }).del();
            res.status(201).json({ message: "usuario deletado com sucesso" });
        }
        catch (error) {
            next(error);
        }
    }
}
