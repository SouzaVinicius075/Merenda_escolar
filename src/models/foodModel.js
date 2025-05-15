import database from '../Config/database.js'

const create = async (value) => {
    try {
        const insertMenu = database('cardapios')
            .insert(value)
        return insertMenu
    } catch (error) {
        return error.message
    }
}
const update = async (filter, value) => {
    try {
        const updateMenu = database('cardapios')
            .where(filter)
            .update(value)

        return updateMenu
    } catch (error) {
        return error.message
    }
}
const get = async () => {
    try {
        const getMenu = database('cardapios')
            .select('car.nome as cardapio', 'dia.nome as dia', 'ref.nome as refeicao')
            .from('cardapios as car')
            .join('dias as dia', 'car.diaid', 'dia.id')
            .join('refeicoes as ref', 'car.tipo_ref', 'ref.id')
            .orderBy('dia.id')
            .orderBy('ref.id')
            .returning('*');

        return getMenu
    } catch (error) {
        return error.message
    }

}
const remove = async (dayid) => {
    try {
        await database('cardapios')
            .delete()
            .where('diaid', dayid)

        return
    } catch (error) {
        return error.message
    }
}
export default { create, update, get, remove }