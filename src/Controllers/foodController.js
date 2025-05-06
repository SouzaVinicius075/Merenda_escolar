import foodModel from "../models/foodModel.js";

const create = async (req, res) =>{
try {
    const {nome, diaid, tipo_ref} = req.body
    const insertMenu = await foodModel.create({
        nome, diaid, tipo_ref
    })

    return res.status(201).json(insertMenu)
} catch (error) {
    return res.status(500).json(error.message)
}
}
const get = async(req, res)=>{
    try {
        const searchMenu = await foodModel.get()

        return res.status(200).json(searchMenu)
    } catch (error) {
        return res.status(501).json(error.message)
    }
}

export default {
    create, get
}