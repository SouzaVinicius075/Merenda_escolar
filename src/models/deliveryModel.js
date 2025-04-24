import database from '../Config/database.js'

const get = async ()=>{
    try {
        
        const getDeliveryBySchool = await database('pedidos')
            .select('p.id as pedidoId', 'p.data_pedido', 'p.data_entrega', 'p.creche', 'p.pre_escola', 'p.fund as fundamental', 'p.func as funcionarios','r.nome as tipo_ref', 'e.nome as nome escola', 'p.entregue')
            .from('pedidos as p')
            .join('refeicoes as r', 'p.tipo_ref', 'r.id')
            .join('escolas as e', 'p.escola_id', 'e.id')
        
        if(getDeliveryBySchool.length == 0)
            return ({'Menssagem':'Não tem'})
        
        
        return getDeliveryBySchool
    } catch (error) {
        return error.message
    }
}
const getByFilter = async (filter)=>{
    try {
        const getDeliveryByFilter = await database('pedidos')
        .select('p.id as pedidoId', 'p.data_pedido', 'p.data_entrega', 'p.creche', 'p.pre_escola', 'p.fund as fundamental', 'p.func as funcionarios','r.nome as tipo_ref', 'e.nome as nome escola', 'p.entregue')
        .from('pedidos as p')
        .join('refeicoes as r', 'p.tipo_ref', 'r.id')
        .join('escolas as e', 'p.escola_id', 'e.id')
        .where(filter)

        if(getDeliveryByFilter.length == 0)
            return ({'Menssagem':'Não tem'})

    } catch (error) {
        return error.message
    }
}
const create = async (orderId,description)=>{
    const deliveryExists = await database('entregas')
        .where({'id_pedido': orderId})
        .first();

    if(deliveryExists)
        return false

    const insertDelivery = await database('entregas')
        .insert(description)
        .returning('*');
    return insertDelivery
}
export default {get, getByFilter, create}