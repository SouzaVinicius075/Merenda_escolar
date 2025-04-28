import database from '../Config/database.js'

const create = async(id,token)=>{
    try {
        const insertToken = await database('tokens')
            .insert({
                'id': id,
                'token':token
            })
            .returning('*');
        return insertToken
    } catch (error) {
        return error.message
    }
}
const getById = async(id)=>{
    const getTokenById = database('token')
        .where({'id':id})
}
const update = async (id, value)=>{
    const updateToken = await database('tokens')
        .update(value)
        .where({'id':id})
        .returning('*');
    return updateToken
}
export default {create, getById, update}