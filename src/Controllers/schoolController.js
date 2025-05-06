import schoolModel from "../models/schoolModel.js";
import userModel from '../models/orderModel.js'
import transporter from "../services/nodemailer.js";

import tokenController from "./tokenController.js";

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
        const {cnpj, nome, zona, endereco, gestorid} = req.body
        const searchSchool = await schoolModel.getById({'cnpj':cnpj})
        
        if(searchSchool){
            return res.status(500).json({'msg':'Escola já cadastrada'})
        }
       const insertSchool = await schoolModel.create({
        cnpj,
        nome,
        zona,
        endereco,
        gestorid
       })

        await tokenController.create(insertSchool[0].id, insertSchool[0].nome)
        return res.status(201).json(insertSchool)
    } catch (error) {
        return res.status(501).json({'msg':error.message})
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
    return res.status(200).json({userDashboard})
   } catch (error) {
    return res.status(500).json({
        'aa':'aa',
        'Mensagem': error.message})
   }
}
const update = async(req, res) =>{
    try {
        const {} = req.body
    } catch (error) {
        
    }
}

export default {
    getSchool,
    createSchool,
    schoolDashboard
}