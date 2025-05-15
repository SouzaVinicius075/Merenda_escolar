import deliveryModel from "../models/deliveryModel.js";
import orderModel from '../models/orderModel.js'
import deliverySchema from "../schemas/deliverySchema.js";

const getDelivery = async (req, res) => {
    try {
        const deliverySchool = await deliveryModel.get()
        if (!deliverySchool)
            return res.status(501).json()

        return res.status(200).json({ deliverySchool })
    } catch (error) {
        return res.status(201).json({ 'Mensagem': error.message })
    }
}
const registerDelivery = async (req, res) => {
    try {
        const { deliveries, escola_id, data_entrega } = req.body
        for (const delivery of deliveries) {
            await deliverySchema.validate({
                creche: delivery.creche,
                pre_escola: delivery.pre_escola,
                fund: delivery.fund,
                func: delivery.func
            })
            const searchDelivery = await orderModel.getDetailed({
                'ref.nome': delivery.tipo,
                'escola_id': escola_id,
                'data_entrega': data_entrega
            })
            if (searchDelivery[0].entregue)
                continue

            await deliveryModel.create({
                'id_pedido': delivery.id
                , 'creche': delivery.creche
                , 'pre_escola': delivery.pre_escola
                , 'fund': delivery.fund
                , 'func': delivery.func
            }
            )
            await orderModel.update(delivery.id, { 'entregue': true })
        }
        return res.status(200).json({ 'Aviso': 'Atualização realizada com sucesso' })

    }
    catch (error) {
        return res.status(501).json({ 'msg': error.message })
    }
}
const dashboard = async (req, res) => {
    try {
        const { startDate, endDate, filter } = req.body
        const teste = await deliveryModel.getByDateRange(startDate, endDate, filter)
        return res.status(200).json(teste)
    } catch (error) {
        return res.status(500).json({ 'aviso': error.message })
    }
}
const update = async (req, res) => {
    try {
        const { updateValues } = req.body
        for (const value of values) {

        }
    } catch (error) {

    }
}

export default { getDelivery, registerDelivery, dashboard }