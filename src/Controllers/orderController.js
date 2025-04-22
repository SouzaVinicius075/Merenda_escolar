import orderModel from '../models/orderModel.js'

const getOrders = async (req, res) =>{
    try {
        const orders = await orderModel.get()

        return res.status(200).json(orders)
    } catch (error) {
        
    }
}

const createOrder = async (req, res) =>{
    try {
        const orderCreated = await orderModel.create(req.body)
        return res.status(201).json(orderCreated)
    } catch (error) {
        
    }
}


export default {getOrders, createOrder}