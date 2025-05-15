import database from '../Config/database.js'

const getTotalOrders = async () => {
    try {

        const search = await database('pedidos')
            .from('pedidos as p')
            .join('refeicoes as r', 'r.id', 'p.tipo_ref')
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
            .groupBy('r.preco_unit', 'r.nome', 'r.id')
            .orderBy('r.id', 'asc');

        return search
    } catch (error) {
        return error.message
    }
}

export default { getTotalOrders }