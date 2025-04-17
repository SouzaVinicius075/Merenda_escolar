import userModel from '../models/userModel.js'
const  createUser = async (req, res) =>{
    const {usr_email, usr_nome, usr_pwd, usr_acess} = req.body
    
    try {
        const userCreated = await userModel.insert(usr_nome, usr_email, usr_pwd, usr_acess)
        if(userCreated){
            return res.status(201).json({
                Mensagem:'Usuário Criado com sucesso',
                Obj: userCreated
            })
        }else{
            return res.status(400).json({'Mensagem':'Email ja cadastrado'})
        }
        
        
    } catch (error) { 
        return res.status(501).json({'Mensagem': error.message})
    }
}
const inactiveUser = async (req, res) =>{
    try {
        const {usr_email} = req.body
        const userInactived = await userModel.inactive(usr_email)

        
        if(userInactived){
        return res.status(200).json(userInactived)
    } else{
        return res.status(400).json({'Mensagem': 'Email não encontrado'})
    }
} catch (error) {
    return res.status(500).json({'Mensagem': error.message})
    }
}

export default{
    createUser, inactiveUser
}