import orderModel from '../models/orderModel.js'

const getOrders = async (req, res) =>{
    try {
        const orders = await orderModel.getDetailed({'nome_escola':'CEECR'})

        return res.status(200).json(orders)
    } catch (error) {
        return res.json({'Mensagem': error.message})
    }
}

const createOrder = async (req, res) =>{
    try {
        
        const {data_entrega, creche, pre_escola, fund, func, tipo_ref} = req.body
        
        const orderCreated = await orderModel.create({
            data_entrega, creche, pre_escola, fund, func, tipo_ref, 
        })
    
        
        return res.status(201).json(orderCreated)
    } catch (error) {
        
    }
}


export default {getOrders, createOrder}