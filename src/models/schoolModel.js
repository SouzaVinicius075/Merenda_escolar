
import database from '../Config/database.js'
const getAll = async()=>{
    const getAllSchools = await database('escolas')
    return getAllSchools
}
const getById = async(_filter)=>{
try {
    if(_filter){
        const result = await database('escolas')
            .where(_filter)
            .first();     
        return result
}   else {
    const result = await database('escolas')
        .select('escolas.*', 'zonas.nome as Zona_nome', 'usuarios.nome as gestor_nome')
        .from('escolas')
        .join('zonas', 'escolas.zona', 'zonas.id' )
        .join('usuarios', 'escolas.gestorid', 'usuarios.id')
        return result
    }
} catch (error) {
    return error.message
}
}   
const create = async (school)=>{
    const schoolCreated = database('escolas')
        .insert(school)
        .returning('*');
        return schoolCreated
}
const update = async (id, values)=>{
    try {
        const updateSchool = await database('escolas')
            .update(values)
            .where({id});
        
        return updateSchool
    } catch (error) {
        return error.message
    }
}
const toggleStatus = async()=>{

}
export default {
    getById, create, update, toggleStatus, getAll
}   