import cron from 'node-cron'
import tokenController from '../Controllers/tokenController.js'
import email from './emailNotification.js'
import schoolModel from '../models/schoolModel.js'

const agenda = async () => {
    cron.schedule(

        '0 0 * * 1-5',
        async () => {
            const schools = await schoolModel.getAll()
            for (const school of schools) {
                await tokenController.create(school.id, school.nome)
            }
            await email.message()

        })
}


export default { agenda }