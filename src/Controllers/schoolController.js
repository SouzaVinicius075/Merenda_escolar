import schoolModel from "../models/schoolModel.js";

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

export default {
    getSchool,
    createSchool
}