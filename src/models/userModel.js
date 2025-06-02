import database from '../Config/database.js'


const getById = async (id) => {
    try {
        const getUserById = await database('usuarios')
            .where({ id })
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
        : await query.select('id', 'nome', 'email', 'acesso', 'ativo');

    if (!result && _email)
        return false;

    return result;
};
const getUserDetailed = async (email) => {
    try {
        const user = await database('usuarios')
            .select('u.id', 'u.nome', 'u.email', 'u.acesso', 'e.nome as nome_escola', 'e.id as id_escola', 'u.senha', 'u.ativo', 'a.nome as tipo_acesso')
            .from('usuarios as u')
            .leftJoin('escolas as e', 'u.id', 'e.gestorid')
            .join('acessos as a', 'u.acesso', 'a.id')
            .where({ 'u.email': email })
            .first();

        return user
    } catch (error) {
        return error.message

    }
}
const insert = async (nome, email, senha, acesso) => {
    const insertUser = await database('usuarios')
        .insert({
            email,
            acesso,
            nome,
            senha
        }).returning('*')
    return insertUser
}
const toggleStatus = async (email, option) => {
    if (!await getByEmail(email))
        return false

    const result = await database('usuarios')
        .update({ 'ativo': option })
        .where({ 'email': email })
        .returning('*');
    return result



}
const update = async (fields) => {
    if (!await getById(fields.id))
        return false
    const userUpdated = await database('usuarios')
        .update(fields)
        .where({ 'id': fields.id })
        .returning('*')

    return userUpdated
}

export default { getByEmail, insert, toggleStatus, update, getUserDetailed }