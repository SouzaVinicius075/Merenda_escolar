import schoolModel from "../models/schoolModel.js";
import userModel from '../models/orderModel.js'
import transporter from "../services/nodemailer.js";

import schedules from '../services/schedules.js'

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
    const userDashboard = await userModel.getDetailed({'esc.id':idEscola})

    // const emails = await transporter.sendMail({
    //     from:'no-reply@2g2m.com.br',
    //     to:'ti@2g2m.com.br',
    //     subject:'teste: nodemail1er'
    // })
    // console.log(emails);
   
        await schedules.createToken()

    return res.status(200).json({userDashboard})
   } catch (error) {
    return res.status(500).json({'Mensagem': error.message})
   }
}

export default {
    getSchool,
    createSchool,
    schoolDashboard
}