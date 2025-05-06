import database from '../Config/database.js'

const get = async ()=>{
    try {
        
        const getDeliveryBySchool = await database('pedidos')
            .select(
                'p.id as pedidoId'
                ,'p.data_pedido'
                ,'p.data_entrega'
                ,'p.creche'
                ,'p.pre_escola'
                ,'p.fund as fundamental'
                ,'p.func as funcionarios'
                ,'r.nome as tipo_ref'
                ,'e.nome as nome_escola'
                ,'p.entregue')
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
const create = async (description)=>{

    const insertDelivery = await database('entregas')
        .insert(description)
        .returning('*');
    return insertDelivery
}
const getByDateRange =async (startDate, endDate, _filter)=>{
    try {
        const searchDeliveryByDate = await database('delivery')
            .select(
                'ped.data_entrega',
                'ped.creche',
                'ped.pre_escola',
                'ped.fund',
                'ped.func',
                'ref.nome as nome_ref',
                'esc.nome as esc_nome',
                'zon.nome as zon_nome',
                'ped.entregue'

            )
            .from('entregas as ent')
            .whereBetween('ped.data_entrega', [startDate, endDate])
            .where(_filter)
            .join('pedidos as ped', 'ent.id_pedido', 'ped.id')
            .join('escolas as esc', 'ped.escola_id', 'escola_id')
            .join('refeicoes as ref', 'ped.tipo_ref', 'ref.id')
            .join('zonas as zon', 'esc.zona', 'zon.id')

        return searchDeliveryByDate
    } catch (error) {
        return error.message
    }
}

export default {get, getByFilter, create,getByDateRange}