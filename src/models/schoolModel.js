
import database from '../Config/database.js'

const getById = async(_filter)=>{
    if(_filter){
        const result = await database('escolas')
            .select('escolas.*', 'zonas.nome as Zona_nome')
            .from('escolas')
            .join('zonas', 'escolas.zona', 'zonas.id' )
            .where(_filter)
            .first();
        return result
}   else {
    const result = await database('escolas')
        .select('escolas.*', 'zonas.nome as Zona_nome')
        .from('escolas')
        .join('zonas', 'escolas.zona', 'zonas.id' )
        return result
    }
}   
const create = async (school)=>{
    if(await getById({'cnpj':school.cnpj})){
        return false
    }


    const schoolCreated = database('escolas')
        .insert(school)
        .returning('*');
        return schoolCreated
}
const update = async ()=>{

}
const toggleStatus = async()=>{

}
export default {
    getById, create, update, toggleStatus
}   