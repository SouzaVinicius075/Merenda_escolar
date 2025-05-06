import database from '../Config/database.js'

const get = async()=>{
    try {
        const getOrder = await database('pedidos')
        return getOrder
    } catch (error) {
        return error.message
    }
}
const getByFilter = async (filter)=>{
    try {
        
        const getOrderByFilter = await database('pedidos')
        .where(filter)
        
        return getOrderByFilter
    } catch (error) {
     return false
    }
}
const getById = async(id)=>{
    try {
        const getorders = await database('pedidos')
            .select('pedidos.*', 'escolas.nome as Nome_escola')
            .join('escolas', 'pedidos.escola_id','escolas.id' )
            .where({'id':id})
        return getorders
    } catch (error) {
        return error.message
    }
}
const getDetailed = async(filter)=>{
    try {
        const getorderDetailed = await database('pedidos')
            .select(
                'ped.id as pedidoId',
                'esc.id as escola_id',
                'esc.nome as nome_escola',
                'ped.data_pedido', 
                'ped.data_entrega as data_entrega', 
                'ref.nome as refeicao_nome',
                'ped.creche as p.creche', 
                'ped.pre_escola as p.pre_escola', 
                'ped.fund as p.fundamental', 
                'ped.func as p.funcionarios',
                'ent.creche as e.creche',
                'ent.pre_escola as e.pre_escola',
                'ent.fund as e.fundamental', 
                'ent.func as e.funcionarios', 
                'ped.entregue' 
            )
            .from('pedidos as ped')
            .leftJoin('entregas as ent','ped.id', 'ent.id_pedido')
            .join('escolas as esc', 'ped.escola_id','esc.id' )
            .join('refeicoes as ref', 'ped.tipo_ref', 'ref.id')
            .where(filter)
        return getorderDetailed
    } catch (error) {
        return error.message
    }

}

const create = async (order)=>{
    try {
        const createOrder = await database('pedidos')
        .insert(order)
        .returning('*')
        return createOrder
    } catch (error) {
    return error.message    
    }
}
const update = async (id, value)=>{
    const updateOrder = await database('pedidos')
        .update(value)
        .where({'id':id})
        .returning('*');
    return updateOrder
}

// const getByDateRange = async (startDate, endDate) =>{
//     try {
//         const searchOrder = await database('pedidos')
//         .select(
//             'p.data_entrega',
//             'p.creche',
//             'p.fund',
//             'p.func',
//             'r.nome',
//             'e.nome'
//             'p.entregue'
            
//         )
//         .from('pedidos as p')
//         .whereBetween('data_entrega', [startDate, endDate])
        
//         return searchOrder
//     } catch (error) {
        
//     }    
// }

export default{
    get, 
    create,
    update, 
    getById, 
    getDetailed, 
    getByFilter 
    //getByDateRange
}