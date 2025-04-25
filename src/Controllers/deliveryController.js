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
   try {
    const {data_entrega, escola_id, tipo, orders} = req.body
    if(tipo == 'parcial'){
        // Pendente validar se a quantidade parcial não exceder o pedido
        for (let order of orders){
            const deliveryPartial = await orderModel.getDetailed({
            'ref.nome':order.tipo,
            'escola_id': escola_id,
            'data_entrega':data_entrega
        })
        
        if (deliveryPartial.length == 0){
            continue
        }
        if(deliveryPartial[0].entregue)
            continue

        await deliveryModel.create({
            'id_pedido':deliveryPartial[0].pedidoId
            ,'creche': order.creche
            ,'pre_escola': order.pre_escola
            ,'fund': order.fund
            ,'func': order.func
        })           
            const switchStatusOrder = await orderModel.update(deliveryPartial[0].pedidoId,{'entregue': true})        
    }
    return res.json({'Mensagem':'Pedido parcial cadastrado com sucesso'})
    }
    const dayOrders = await orderModel.getByFilter({
            
        escola_id, data_entrega
    })

  
    for (let order of dayOrders){
        if(dayOrders.length == 0)
            continue

        
        if(order.entregue)
            continue
        
         await deliveryModel.create({
            'id_pedido':order.id
            ,'creche': order.creche
            ,'pre_escola': order.pre_escola
            ,'fund': order.fund
            ,'func': order.func
        })
        const switchStatusOrder = await orderModel.update(order.id,{'entregue': true})
       
    }
    
    return res.status(200).json({'Mensagem':'oq'})
}
         catch (error) {
            
        }
}

export default {getDelivery, registerDelivery}