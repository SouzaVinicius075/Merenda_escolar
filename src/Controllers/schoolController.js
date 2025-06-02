import schoolModel from "../Models/schoolModel.js";
import userModel from '../Models/orderModel.js'
import tokenController from "./tokenController.js";

const getSchool = async (req, res) => {
    try {
        const schools = await schoolModel.getById()
        return res.status(200).json(schools)
    } catch (error) {
        return res.status(500).json({ 'Mensagem': error.message })
    }
}
const createSchool = async (req, res) => {
    try {
        const { cnpj, nome, zona, endereco, gestorid } = req.body
        const searchSchool = await schoolModel.getById({ 'cnpj': cnpj })

        if (searchSchool) {
            return res.status(500).json({ 'msg': 'Escola já cadastrada' })
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
        return res.status(501).json({ 'msg': error.message })
    }
}

const schoolDashboard = async (req, res) => {
    try {
        const { idEscola } = req.user
        const userDashboard = await userModel.getDetailed({ 'esc.id': idEscola })

        return res.status(200).json({ userDashboard })
    } catch (error) {
        return res.status(500).json({
            'aa': 'aa',
            'Mensagem': error.message
        })
    }
}
const update = async (req, res) => {
    try {
        const { id, ...dados } = req.body

        const searchSchool = await schoolModel.getById({ 'cnpj': dados.cnpj })

        if (!searchSchool || searchSchool.id == id) {


            const updateSchool = await schoolModel.update(id, dados)


            return res.status(200).json(updateSchool)
        }
        else
            return res.status(501).json({ 'Aviso': 'CNPJ já registrado em outra escola' })
    } catch (error) {

    }
}

export default {
    getSchool,
    createSchool,
    schoolDashboard,
    update
}