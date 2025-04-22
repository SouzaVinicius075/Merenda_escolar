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
    const {usr_email, option} = req.body
    const switchUserStatus = await userModel.toggleStatus(usr_email,option)
    if(!switchUserStatus)
        return res.status(400).json({'Mensagem': 'Email não encontrado'})

    return res.status(200).json(switchUserStatus)
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
    getUser,createUser, SwitchUserStatus, updateUser
}