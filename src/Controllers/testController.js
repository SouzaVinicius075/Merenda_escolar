import schoolModel from "../Models/schoolModel.js";
import reportController from '../Controllers/reportController.js'
import agenda from '../services/schedules.js'
//import PDFReport from '../services/createReportPDF.js'
const create = async (req, res) => {
    //await PDFReport()

    // const schools = await schoolModel.getAll()
    // for (const school of schools) {

    // const valor = await reportController.get()
    //     await tokenController.create(school.id, school.nome)

    // }

    return res.status(200).json(valor)
}

export default {
    create
}