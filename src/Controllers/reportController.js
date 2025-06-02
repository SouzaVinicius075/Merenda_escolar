
import reportModel from '../Models/reportModel.js'

const getDetailed = async (req, res) => {
    try {
        const { mes } = req.body
        const detailedReport = await reportModel.getDetailedOrders(mes)
        return res.status(200).json(detailedReport)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const getTotalGeneral = async (req, res) => {
    try {
        const { mes } = req.body
        const generalReport = await reportModel.getTotalOrders(mes)


        return res.status(200).json(generalReport)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export default {
    getDetailed, getTotalGeneral
}