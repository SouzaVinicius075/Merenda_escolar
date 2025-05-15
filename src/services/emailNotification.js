import transporter from '../Config/nodemailer.js'
import userModel from '../models/userModel.js'

const message = async () => {
  try {
    const users = await userModel.getByEmail()

    for (const user of users) {
      if (user.acesso == 1)
        continue

      await transporter.sendMail({
        from: 'no-reply@2g2m.com.br',
        to: user.email,
        subject: 'Lembrete Diário Sistema de merenda escolar',
        text: `Olá ${user.nome}, este é um aviso diário para a criação de pedidos no sistema de merenda escolar, lembrando que o prazo é até as 16:00 Horas de hoje`
      })

    }
    return
  } catch (error) {
    return error.message
  }
}


export default { message }
// console.log(emails);