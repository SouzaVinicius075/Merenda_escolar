import database from '../Config/database.js'

const getTotalOrders = async (mes) => {
    try {

        const search = await database
            .select(
                'r.nome',
                'r.preco_unit',
                database.raw('SUM(p.creche) as TotalPedido'),
                database.raw('SUM(p.creche) * r.preco_unit as totalcreche'),
                database.raw('SUM(p.pre_escola) as totalPPre'),
                database.raw('SUM(p.pre_escola) * r.preco_unit as VLRTotalPre'),
                database.raw('SUM(p.fund) as TotalFund'),
                database.raw('SUM(p.fund) * r.preco_unit as VLRTotalFund'),
                database.raw('SUM(p.creche + p.fund + p.pre_escola) as VLRTOTAL'),
                database.raw(`SUM(
                p.creche * r.preco_unit +
                p.pre_escola * r.preco_unit + 
                p.fund * r.preco_unit
                ) as VLRTOTAL`)
            )
            .from('pedidos as p')
            .join('refeicoes as r', 'r.id', 'p.tipo_ref')
            .where(database.raw(`extract(month from p.data_entrega) = ${mes}`))
            .groupBy('r.preco_unit', 'r.nome', 'r.id')
            .orderBy('r.id', 'asc');

        return search
    } catch (error) {
        return error.message
    }
}
const getDetailedOrders = async (mes) => {
    try {
        const searchDetailed = await database
            .select(
                'esc.nome as escola',
                'zon.nome as zona',
                'ref.nome as refeicao',
                'ped.data_entrega',
                'ent.creche',
                'ent.pre_escola',
                'ent.fund',
                'ent.func',
            )
            .from('entregas as ent')
            .join('pedidos as ped', 'ent.id_pedido', 'ped.id')
            .join('escolas as esc', 'ped.escola_id', 'esc.id')
            .join('refeicoes as ref', 'ped.tipo_ref', 'ref.id')
            .join('zonas as zon', 'esc.zona', 'zon.id')
            .where(database.raw(`extract(month from ped.data_entrega) = ${mes}`))

        return searchDetailed
    } catch (error) {
        return error.message
    }
}

export default { getTotalOrders, getDetailedOrders }