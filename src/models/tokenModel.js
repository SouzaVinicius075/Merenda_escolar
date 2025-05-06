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
    try {
        const getTokenById = database('tokens')
        .where({'id':id})
        .first()
        
        return getTokenById
    } catch (error) {
        return error.message
    }

}
const update = async (id, value)=>{
    const updateToken = await database('tokens')
        .update({'token':value})
        .where({'id':id})
        .returning('*');
    return updateToken
}
export default {create, getById, update}