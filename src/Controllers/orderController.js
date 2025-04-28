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
        const {idEscola} = req.user
        
        const {orders } = req.body


        for(const order of orders){
                        
            let searchOrders = await orderModel.getByFilter({'escola_id' :idEscola, 'data_entrega': order.data_entrega, 'tipo_ref':order.tipo_ref})
            if(searchOrders.length != 0){
                
                continue
            }

         await orderModel.create({
                'data_entrega':order.data_entrega,
                'creche':order.creche, 
                'pre_escola':order.pre_escola,
                'fund':order.fund,
                'func':order.func,
                'tipo_ref':order.tipo_ref,
                'escola_id':idEscola
            })
            
        }

        return res.status(201).json()
    } catch (error) {
        return res.status(501).json({'msg':error.message});
        
    }
}
const updateOrder = async (req,res)=>{
    try {
    // recebe id data e escola para fazer update
    //verifica no banco se existe
    // verifica ja foi entregue
    //edita
    //validar se a data entrega é o dia seguinte
    const {nomeEscola} = req.user
    const {data_entrega, orders} = req.body
    
    for(const order of orders){
        const searchOrder = await orderModel.getDetailed({
            'ped.id':order.idPedido
    })

        if(searchOrder.length == 0){
            console.log('não existe');
            
            continue
        }
        
        
        if(searchOrder[0].nome_escola != nomeEscola){
        console.log('acessando outra escola');
        continue}
    if(searchOrder[0].entregue){
        console.log('ja foi entregue');
        continue
    }
    const {idPedido, ...values} = order
    const orderUpdated = orderModel.update(idPedido, values)
}
return res.status(200).json()
} catch (error) {
        return res.status(205).json(error.message)
}
}


export default {getOrders, createOrder, updateOrder}