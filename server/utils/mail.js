import * as nodemailer from 'nodemailer'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../../.env')
config({ path: envPath })

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS
const host = process.env.MAIL_HOST

export const mail = nodemailer.createTransport({
  host: host,
  port: 465,
  auth: {
    user: user,
    pass: pass,
  },
})

export const sendMail = (to, subject, text) => {
  return mail.sendMail({ from: user, to, subject, text })
}

export default mail
