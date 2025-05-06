import cron from 'node-cron'
import tokenController from '../Controllers/tokenController.js'

const agenda = async ()=>{
    cron.schedule(

        '0 0 * * 1-5',
        async ()=>{
            
            await tokenController.update()

            
    })
}


export default{agenda}