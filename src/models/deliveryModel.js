import database from '../Config/database.js'

const get = async () => {
    try {

        const getDeliveryBySchool = await database('pedidos')
            .select(
                'p.id as pedidoId'
                , 'p.data_pedido'
                , 'p.data_entrega'
                , 'p.creche'
                , 'p.pre_escola'
                , 'p.fund as fundamental'
                , 'p.func as funcionarios'
                , 'r.nome as tipo_ref'
                , 'e.nome as nome_escola'
                , 'p.entregue')
            .from('pedidos as p')
            .join('refeicoes as r', 'p.tipo_ref', 'r.id')
            .join('escolas as e', 'p.escola_id', 'e.id')

        if (getDeliveryBySchool.length == 0)
            return ({ 'Menssagem': 'Não tem' })


        return getDeliveryBySchool
    } catch (error) {
        return error.message
    }
}
const getByFilter = async (filter) => {
    try {
        const getDeliveryByFilter = await database('pedidos')
            .select('p.id as pedidoId',
                'p.data_pedido',
                'p.data_entrega',
                'p.creche',
                'p.pre_escola',
                'p.fund as fundamental',
                'p.func as funcionarios',
                'r.nome as tipo_ref',
                'e.nome as nome escola',
                'p.entregue')
            .from('pedidos as p')
            .join('refeicoes as r', 'p.tipo_ref', 'r.id')
            .join('escolas as e', 'p.escola_id', 'e.id')
            .where(filter)

        if (getDeliveryByFilter.length == 0)
            return ({ 'Menssagem': 'Não tem' })

    } catch (error) {
        return error.message
    }
}
const create = async (description) => {

    const insertDelivery = await database('entregas')
        .insert(description)
        .returning('*');
    return insertDelivery
}
const getByDateRange = async (startDate, endDate, _filter) => {
    try {
        const searchDeliveryByDate = await database
            .select(
                'ped.id as id_ped',
                'ped.data_entrega as p_dataEntrega',
                'ped.creche as p_creche',
                'ped.pre_escola as p_preEscola',
                'ped.fund as p_fund',
                'ped.func as p_func',
                'ent.creche as e_creche',
                'ent.pre_escola as e_preEscola',
                'ent.fund as e_fund',
                'ent.func as e_func',
                'ref.nome as nome_ref',
                'esc.nome as esc_nome',
                'zon.nome as zon_nome',
                'ped.entregue'
            )
            .from('entregas as ent')
            .whereBetween('ped.data_entrega', [startDate, endDate])
            .where(_filter)
            .join('pedidos as ped', 'ent.id_pedido', 'ped.id')
            .join('escolas as esc', 'ped.escola_id', 'esc.id')
            .join('refeicoes as ref', 'ped.tipo_ref', 'ref.id')
            .join('zonas as zon', 'esc.zona', 'zon.id')
            .orderBy('p_dataEntrega', 'asc')

        return searchDeliveryByDate
    } catch (error) {
        return error.message
    }
}
const update = async (id, values) => {
    try {
        const updateDelivery = await database('entregas')
            .update(values)
            .where(id)

        return updateDelivery
    } catch (error) {
        return error.message
    }
}

export default { get, getByFilter, create, getByDateRange, update }