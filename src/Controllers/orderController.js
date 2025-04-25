import orderModel from '../models/orderModel.js'
import schoolModel from '../models/schoolModel.js'
import cron from 'node-cron'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
const createWarning = async ()=>{
     cron.schedule('0 0 * * 1-5', async ()=>{
        const schools = await schoolModel.getAll()
        for (const school of schools){
            
        }
        
    })
}
const getOrders = async (req, res) =>{
    try {
        const orders = await orderModel.getDetailed({})

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