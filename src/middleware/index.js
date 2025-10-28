"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareUser = void 0;
function validadeUser(req, res, next) {
    const { name, password } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'O campo "name" é obrigatório e deve ser uma string.' });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'O campo "task" é obrigatório e deve ser uma string.' });
    }
    next();
}
// Middleware para validar o corpo da requisição ao editar uma task
function validateEditTask(req, res, next) {
    const { task } = req.body;
    if (!task || typeof task !== 'string') {
        return res.status(400).json({ message: 'O campo "task" é obrigatório e deve ser uma string.' });
    }
    next();
}
// Exporta os middlewares em um objeto para facilitar a importação
exports.MiddlewareUser = {
    validadeUser,
    validateEditTask,
};
