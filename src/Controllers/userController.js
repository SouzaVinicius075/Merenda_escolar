import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'

const getUser = async(req,res)=>{
    try {
        const user = await userModel.getByEmail()
        const {senha, ...dados} = user
        console.log(senha);
        
        return res.status(200).json(dados)
    } catch (error) {
        return res.status(400).json({'Mensagem': error.message})
    }
}
const  create = async (req, res) =>{
    try {
        const {usr_email, usr_nome, usr_pwd, usr_acess} = req.body
        const verifyUser = await userModel.getByEmail(usr_email)  
       
        if(verifyUser){
            return res.status(400).json({'Mensagem':'Email ja cadastrado'})
        } 
        const pwdEncrypted = await bcrypt.hash(usr_pwd,10)
    
        const userCreated = await userModel.insert(usr_nome, usr_email, pwdEncrypted, usr_acess)

            return res.status(201).json({
                Mensagem:'Usuário Criado com sucesso',
                Obj: userCreated
            })
    } catch (error) { 
        return res.status(501).json({'Mensagem': error.message})
    }
}
const SwitchUserStatus = async (req, res) =>{
    try {
        const {usr_email, option} = req.body
        const switchUserStatus = await userModel.toggleStatus(usr_email,option)
        if(!switchUserStatus)
            return res.status(400).json({'Mensagem': 'Email não encontrado'})
    
        return res.status(200).json(switchUserStatus)
    } catch (error) {
        return res.status(501).json({'Mensagem': error.message})
    }

}

const updateUser = async (req, res) =>{
    try {
        const userUpdated = await userModel.update(req.body)

        if(!userUpdated)
            return res.status(501)

        return res.status(200).json(userUpdated)
    } catch (error) {
        return res.status(501).json({'Mensagem': error.message})
    }
}

export default{
    getUser,create, SwitchUserStatus, updateUser
}