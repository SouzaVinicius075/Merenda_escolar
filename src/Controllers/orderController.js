import orderModel from '../models/orderModel.js'
const getOrders = async (req, res) => {
    try {
        if (req.params.status) {
            const orders = await orderModel.getDetailed({ "entregue": req.params.status })

            return res.status(200).json(orders)
        }
        const orders = await orderModel.getDetailed({})

        return res.status(200).json(orders)
    } catch (error) {
        return res.json({ 'Mensagem': error.message })
    }
}

const createOrder = async (req, res) => {
    try {
        const { idEscola } = req.user
        const { orders } = req.body
        for (const order of orders) {
            let searchOrders = await orderModel.getByFilter({ 'escola_id': idEscola, 'data_entrega': order.data_entrega, 'tipo_ref': order.tipo_ref })
            if (searchOrders.length != 0) {
                return res.status(501).json({ 'Aviso': 'Pedido ja existente na base de dados' })
            }

            await orderModel.create({
                'data_entrega': order.data_entrega,
                'creche': order.creche,
                'pre_escola': order.pre_escola,
                'fund': order.fund,
                'func': order.func,
                'tipo_ref': order.tipo_ref,
                'escola_id': idEscola
            })

        }
        return res.status(201).json({ 'msg': 'sucesso ao cadastrar' })
    } catch (error) {
        return res.status(501).json({ 'msg': error.message });

    }
}
const updateOrder = async (req, res) => {
    try {
        const { nomeEscola } = req.user
        const { orders } = req.body

        for (const order of orders) {
            const searchOrder = await orderModel.getDetailed({
                'ped.id': order.idPedido
            })

            if (searchOrder.length == 0) {


                continue
            }


            if (searchOrder[0].nome_escola != nomeEscola) {
                continue
            }
            if (searchOrder[0].entregue) {
                return res.status(501).json({ 'Aviso': 'O pedido ja foi entregue' })
            }
            const { idPedido, ...values } = order
            await orderModel.update(idPedido, values)
        }
        return res.status(200).json({ 'Aviso': 'Pedido atualizado com sucesso' })
    } catch (error) {
        return res.status(205).json(error.message)
    }
}


export default { getOrders, createOrder, updateOrder }