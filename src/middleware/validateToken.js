import jwt from 'jsonwebtoken';
import userModel from '../Models/userModel.js';
import tokenModel from '../Models/tokenModel.js';

const validate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ mensagem: 'Usuário não autorizado!' });
        }
        let token = authorization.replace('Bearer ', '').trim();
        const userLogged = jwt.verify(token, process.env.JWT_SECRET);

        if (!await userModel.getByEmail(userLogged.email)) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        const { senha, iat, exp, ...user } = userLogged;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            mensagem:
                'O usuário precisa estar logado e informar um token válido para acessar o recurso.',
            erro: error.message
        });
    }
};
// const isAdminUser = async (req, res, next) => {
//     const { acesso } = req.user;
//     if (acesso != 1) {
//         return res.status(401).json({
//             "mensagem":
//                 'O usuário não possui a autorização necessária para acessar este recurso.',
//         });
//     }
//     next();
// }
const isSchool = async (req, res, next) => {
    const { nome_escola } = req.user
    if (!nome_escola)
        return res.status(301).json({
            "mensagem":
                'O usuário não possui a autorização necessária para acessar este recurso.',
        });
    next()
}
const avaliableTime = async (req, res, next) => {
    try {
        const { idEscola } = req.user
        const tokenValid = await tokenModel.getById(idEscola)
        jwt.verify(tokenValid.token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(500).json({ 'Aviso': 'Pedido fora do horário permitido, todos pedidos deverão ser registrados entre 00 e 16 horas' })
    }
}
export default {
    validate, isSchool, avaliableTime
};
