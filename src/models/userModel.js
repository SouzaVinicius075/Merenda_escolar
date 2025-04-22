import database from '../Config/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const getById = async(id)=>{
    try {
        const getUserById = await database('usuarios')
            .where({id})
            .first();

        return getUserById
    } catch (error) {
        return error 
    }
}
const getByEmail = async (_email) => {
    const query = database('usuarios');
    
    const result = _email 
        ? await query.where({ email: _email }).first() 
        : await query;

    if (!result && _email) 
        return false;
    
    return result;
};
const validate = async(email, pwd)=>{
    try {
        const user = await database('usuarios')
            .select('usuarios.id', 'usuarios.nome', 'usuarios.email', 'usuarios.acesso', 'escolas.nome as nome_escola', 'escolas.id as id_escola', 'usuarios.senha as senha' ,'usuarios.ativo')
            .leftJoin('escolas', 'usuarios.id', 'escolas.gestorid')
            .where({'usuarios.email': email})
            .first()

        
        if(!user || await bcrypt.compare(pwd, user.senha) && !user.ativo)
            return false

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                email: user.email,
                acesso: user.acesso,
                nomeEscola: user.nome_escola,
                idEscola: user.id_escola
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            })
        return token
        
    } catch (error) {
        return error
    }
}

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
const toggleStatus = async (email, option)=>{
    if(!await getByEmail(email))
        return false

        const result = await database('usuarios')
            .update({'ativo': option})
            .where({'email':email})
            .returning('*');
        return result
    
        

}
const update = async(fields)=>{
    if(!await getById(fields.id))
        return false
    const userUpdated = await database('usuarios')
        .update(fields)
        .where({'id':fields.id})
        .returning('*')
    
    return userUpdated
}
/*
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
}*/

export default {getByEmail, insert, validate, toggleStatus, update}