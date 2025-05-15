import schoolModel from "../models/schoolModel.js";
import tokenController from "./tokenController.js";
import agenda from '../services/schedules.js'
const create = async (req, res) => {

    // const schools = await schoolModel.getAll()
    // for (const school of schools) {

    agenda.agenda()
    //     await tokenController.create(school.id, school.nome)

    // }

    return res.status(200).json({ 'frmz': 'valeu' })
}

export default {
    create
}