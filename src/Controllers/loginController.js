import userModel from '../Models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    try {
        const { usr_email, usr_pwd } = req.body

        const verifyUser = await userModel.getUserDetailed(usr_email)

        if (!verifyUser || !await bcrypt.compare(usr_pwd, verifyUser.senha) || !verifyUser.ativo) {
            return res.status(500).json({ 'Mensagem': 'Usuário ou senha incorretos' })
        }


        const token = jwt.sign(
            {
                id: verifyUser.id,
                nome: verifyUser.nome,
                email: verifyUser.email,
                acesso: verifyUser.acesso,
                nomeEscola: verifyUser.nome_escola,
                idEscola: verifyUser.id_escola
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            })


        return res.status(200).json({ 'Token': token })
    } catch (error) {
        return res.status(500).json({ 'Mensagem': error.message })
    }
}
export default { login }