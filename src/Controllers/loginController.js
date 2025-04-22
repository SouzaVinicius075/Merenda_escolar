import userModel from '../models/userModel.js'

const login = async (req, res) =>{

    try {
        const {usr_email, usr_pwd} = req.body
        const loginUser = await userModel.validate(usr_email, usr_pwd)

        if(!loginUser)
            return res.status(500).json({'Mensagem':'Usuário ou senha incorretos' })
        
        return res.status(200).json({'Token':loginUser})
    } catch (error) {
        return res.status(500).json({'Mensagem': error.message})   
    }
}
export default {login}