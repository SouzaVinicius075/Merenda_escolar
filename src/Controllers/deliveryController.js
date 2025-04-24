import deliveryModel from "../models/deliveryModel.js";
import orderModel from '../models/orderModel.js'

const getDelivery = async(req, res)=>{
    try {
        const deliverySchool = await deliveryModel.get()
        if(!deliverySchool)
            return res.status(501).json()

        return res.status(200).json({deliverySchool})
    } catch (error) {
        return res.status(201).json({'Mensagem':error.message})
}
}
const registerDelivery = async (req, res)=>{
    /* 1 - Ir na tabela de pedidos e retornar todos pedidos daquela escola, naquele dia
        2 - Validar se o valor requisitado não é maior que o valor pedido
    */
    const dayOrders = await orderModel.getByFilter({
        escola_id, date
    })
    for (const order of dayOrders){
        const insertDelivery = await deliveryModel.create({
            id_pedido
            ,creche
            ,pre_escola
            ,fund
            ,func
        })
        const switchStatusOrder = await orderModel.update({
            entregue: true
            ,id_pedido
        })
    }
}

export default {getDelivery, registerDelivery}