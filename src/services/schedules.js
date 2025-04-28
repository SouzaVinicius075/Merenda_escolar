import cron from 'node-cron'
import jwt from 'jsonwebtoken'
import schoolModel from '../models/schoolModel.js'
import tokenModel from '../models/tokenModel.js'
// cron.schedule('00**1-5',async ()=>{
// await createToken()
// })

const createToken = async()=>{
    const schools = await schoolModel.getAll()
    for (const school of schools){
        const token = jwt.sign({
            school
        },process.env.JWT_SECRET,{
            expiresIn: '16h'
        })
        const aboba =await  tokenModel.create(school.id, token)
        console.log( aboba);
        
    }
}
export default{createToken}