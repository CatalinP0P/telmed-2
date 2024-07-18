import express from 'express'
import { sendMail } from '../utils/mail.js'

const router = express.Router()

router.post('/contact', async (req, res) => {
  const { name, email, phoneNumber, text } = req.body

  const body = `Nume: ${name}\nEmail:${email}\nTel:${phoneNumber}\n\n${text}`
  console.log(body)

  try {
    sendMail(
      email,
      'Multumim pentru mesaj - TelmedPro',
      'Multumim pentru mesaj, acesta este un auto-reply, vom raspunde in cel mai scurt timp\n\nO zi buna!\nEchipa Telmed',
    )
    sendMail('contact@telmed.pro', `Mesaj nou de la ${name} - TelmedPro`, body)
  } catch (err) {
    res.status(400).json('A aparut o eroare, incercati mai tarziu')
  }

  res.json('Mesaj Trimis')
})

export default router
