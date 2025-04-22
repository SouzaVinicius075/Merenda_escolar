import database from '../Config/database.js'

const get = async(_filter)=>{
    if(_filter){
        const getOrder = await database('pedidos')
        .where(_filter) 
    return getOrder
}
    const getorders = await database('pedidos')
        .select('pedidos.*', 'escolas.nome as Nome_escola')
        .join('escolas', 'pedidos.escola_id','escolas.id' )
        .orderBy('Nome_escola', 'desc')
    return getorders
}

const create = async (order)=>{
    //verificar se ja há um pedido do mesmo tipo (D/L1/A/L2)
    try {
        
        if(
            await database('pedidos')
            .where({
                'escola_id':order.escola_id,
                'tipo_ref':order.tipo_ref,
                'data_entrega':order.data_entrega
            })
            .first()
    ){      
        return false}

        const createOrder = await database('pedidos')
        .insert(order)
        .returning('*')
        return createOrder
    } catch (error) {
    return false    
    }
}

export default{get, create}