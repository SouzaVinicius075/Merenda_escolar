import userModel from '../models/userModel.js'
const getUser = async(req,res)=>{
    try {
        const user = await userModel.getByEmail()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({'Mensagem': error.message})
    }
}
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
const SwitchUserStatus = async (req, res) =>{
    try {
        const {usr_email, usr_option} = req.body
        if(usr_option){
            const userActived = await userModel.inative(usr_email)

        
            if(userActived){
                return res.status(201).json(userActived)
    }   else{
            return res.status(400).json({'Mensagem': 'Email não encontrado'})
    }}else {
        const userInactived = await userModel.inative(usr_email)

        
        if(userInactived){
            return res.status(200).json(userInactived)
    } else{
            return res.status(400).json({'Mensagem': 'Email não encontrado'})
    }
}} catch (error) {
    return res.status(500).json({'Mensagem': error.message})
    }
}

export default{
    getUser,createUser, SwitchUserStatus
}