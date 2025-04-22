import database from '../Config/database.js'
import bcrypt from 'bcrypt'

const getByEmail = async (_email) => {
    const query = database('usuarios');

    const result = _email 
        ? await query.where({ email: _email }).first() 
        : await query;

    if (!result && _email) return false;
    return result;
};

const insert = async(nome,email, senha, acesso) =>{
    
    if(await getByEmail(email)){
        return false;
        }
    
    const senhaCriptografada = await bcrypt.hash(senha,10)
    const insertUser = await database('usuarios').insert({
        email,
        acesso,
        nome,
        'senha':senhaCriptografada
    }).returning('*')
    return insertUser
}
const inactive = async(email) =>{
    if(!await getByEmail(email)){
        return false
    }
    const inactiveUser = await database('usuarios')
    .where({'email':email})
    .update({'ativo': false})
    .returning('*');

    
    return inactiveUser
}

const active = async (email) =>{
    if(!await getByEmail(email)){
        return false
    }
    
    const activeUser = await database('usuarios')
    .where({'email':email})
    .update({'ativo': true})
    .returning('*');

    return activeUser
}

export default {getByEmail, insert,inactive, active}