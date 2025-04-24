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
    const getOrderByFilter = await database('pedidos')
        .where(filter)
    
    return getOrderByFilter
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
                'esc.nome as nome_escola',
                'ped.data_pedido', 
                'ped.data_entrega', 
                'ref.nome as Refeicao',
                'ped.creche as ped_creche', 
                'ped.pre_escola as ped.p_pre_escola', 
                'ped.fund as ped.fundamental', 
                'ped.func as ped_funcionarios',
                'ent.creche',
                'ent.pre_escola',
                'ent.fund as fundamental', 
                'ent.func as funcionarios', 
                'ped.entregue' 
            )
            .from('pedidos as ped')
            .join('entregas as ent','ped.id', 'ent.id_pedido')
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
        console.log(order);
        
        if(
            await database('pedidos')
            .where({
                'escola_id':order.escola_id,
                'tipo_ref':order.tipo_ref,
                'data_entrega':order.data_entrega
            })
            .first()

    )       return false

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

export default{get, create,update, getById, getDetailed, getByFilter}