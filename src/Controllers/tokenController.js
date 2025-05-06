import jwt from 'jsonwebtoken'
import tokenModel from '../models/tokenModel.js'
import schoolModel from '../models/schoolModel.js'
const create = async (id, nome)=>{
    const now = new Date()
    const target = new Date()
    let timingRemain = 0
    target.setHours(17,0,0,0)

    if(now < target){
        const diffMs = target - now
        timingRemain = Math.floor(diffMs / (1000 * 60 * 60))
    }
    const token = jwt.sign({
        id,
        nome
    },process.env.JWT_SECRET,{
        expiresIn: `${timingRemain}h`
    })
        await tokenModel.create(id, token)
     
}

const update = async()=>{
    try {
        const schools = await schoolModel.getAll()
        for (const school of schools){
            
            const now = new Date()
            const target = new Date()
            let timingRemain = 0
            target.setHours(17,0,0,0)
    
            if(now < target){
                
                const diffMs = target - now
                timingRemain = Math.floor(diffMs / (1000 * 60 * 60))
            }
                    const token = jwt.sign(
                                {
                                    school_id:school.id,
                                    school_name: school.nome
                                },
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: `${timingRemain}h`
                                })
                                jwt.verify(token, process.env.JWT_SECRET)
                                
            await tokenModel.update(school.id, token)
                                
        }
        return true
    } catch (error) {
        return res.status(504).json({'msg':error.message})
    }

}

export default {update, create}