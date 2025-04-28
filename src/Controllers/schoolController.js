import schoolModel from "../models/schoolModel.js";
import userModel from '../models/orderModel.js'
const getSchool = async (req, res)=>{
    try {
        const schools = await schoolModel.getById()
        return res.status(200).json(schools)
    } catch (error) {
        return res.status(500).json({'Mensagem':error.message})
    }
}
const createSchool = async (req, res) =>{
    try {
        const insertSchool = await schoolModel.create(req.body)
        if(!insertSchool)
            return res.status(500).json({'Mensagem': 'Escolá já cadastrada'})

        return res.status(201).json(insertSchool)
    } catch (error) {
        
    }
}

const schoolDashboard = async(req, res)=>{
   try {
    const {idEscola} = req.user
    console.log(req.user);
    
    const userDashboard = await userModel.getDetailed({'esc.id':idEscola})
    return res.status(200).json({userDashboard})
   } catch (error) {
    
   }
}

export default {
    getSchool,
    createSchool,
    schoolDashboard
}