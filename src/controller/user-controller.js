"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUser = void 0;
const database_1 = require("@/database");
const node_crypto_1 = __importDefault(require("node:crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class ControllerUser {
    async index(req, res, next) {
        try {
            const retornoAll = await (0, database_1.knex)("user").select("*");
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
            const id = node_crypto_1.default.randomUUID();
            const senhaHash = await bcrypt_1.default.hash(password, 10);
            await (0, database_1.knex)("user").insert({ id, name, password: senhaHash, task });
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
            const getUser = await (0, database_1.knex)("user").where({ id }).first();
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
            const userEditado = await (0, database_1.knex)("user")
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
            await (0, database_1.knex)("user").where({ id }).del();
            res.status(201).json({ message: "usuario deletado com sucesso" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ControllerUser = ControllerUser;
