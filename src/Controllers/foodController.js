import foodModel from "../models/foodModel.js";

const create = async (req, res) => {
    try {
        const { insertValues } = req.body

        for (const value of insertValues) {
            await foodModel.create({
                'nome': value.nome,
                'diaid': value.diaid,
                'tipo_ref': value.tipo_ref
            })
        }

        return res.status(201).json(await foodModel.get())
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const get = async (req, res) => {
    try {
        const searchMenu = await foodModel.get()

        return res.status(200).json(searchMenu)
    } catch (error) {
        return res.status(501).json(error.message)
    }
}
const update = async (req, res) => {
    try {
        const { updateValues } = req.body
        for (const value of updateValues) {
            await foodModel.update({
                'diaid': value.diaid,
                'tipo_ref': value.tipo_ref
            }, {
                'nome': value.nome
            })

        }
        return res.status(200).json(await foodModel.get())
    } catch (error) {
        return error.message
    }
}
const remove = async (req, res) => {
    try {
        const { days } = req.body
        for (const dayName of days) {
            foodModel.remove(dayName)
        }

        return res.status(200).json(await foodModel.get())
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export default {
    create, get, update, remove
}