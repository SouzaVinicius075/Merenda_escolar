import database from '../Config/database.js'

const create = async(id,token)=>{
    try {
        const insertToken = await database('token')
            .insert({
                'id': id,
                'token:':token
            })
            .returning('*');
        return insertToken
    } catch (error) {
        
    }
}
const getById = async(id)=>{
    const getTokenById = database('token')
        .where({'id':id})
}
export default {create, getById}