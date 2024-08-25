import express from 'express'
import firebaseAuthorization from '../middlewares/authorization.js'
import adminController from '../controllers/adminController.js'
import admin from '../utils/firebase.js'
import { sendMail } from '../utils/mail.js'
import medicController from '../controllers/medicController.js'
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/', firebaseAuthorization, async (req, res) => {
  try {
    const id = req.user.uid
    return res.json(await adminController.isAdmin(id))
  } catch (err) {
    res.json(err).status(400)
  }
})

router.get('/all', async (req, res) => {
  try {
    const admins = await adminController.getAll()
    res.json(admins)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/add/:id', async (req, res) => {
  try {
    const { id } = req.params
    return res.json(await adminController.add(id))
  } catch {
    res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await adminController.remove(id)
    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

router.post('/createAccount', async (req, res) => {
  const { email, password } = req.body
  try {
    const response = await admin.auth().createUser({ email, password })
    res.json(response)
  } catch (err) {
    res.status(400).json(err.message)
  }
})

router.post('/sendInvitationMail', async (req, res) => {
  const { email, password, text } = req.body

  const body = `
Dragă ${email},

Sperăm că acest e-mail te găsește bine! Avem plăcerea de a te invita să te alături comunității TelMed, o platformă inovatoare creată pentru a răspunde întrebărilor tale legate de sănătate și medicină.

Ce este TelMed?

TelMed este o aplicație dedicată celor care doresc să afle mai multe despre diverse aspecte ale sănătății, să primească sfaturi de la profesioniști din domeniul medical și să participe la discuții utile despre îngrijirea sănătății. Indiferent dacă ești în căutarea unor răspunsuri legate de simptome, tratamente sau practici de prevenire, TelMed îți oferă o platformă sigură și informativă.

Ce îți oferim?

Răspunsuri la Întrebări: Pune întrebări legate de sănătate și primește răspunsuri de la medici și specialiști în domeniu.
Forum de Discuții: Participă la discuții pe diverse teme medicale și află opiniile altor utilizatori și profesioniști.
Articole și Resurse: Accesează articole educative și resurse medicale pentru a rămâne informat și a lua decizii în cunoștință de cauză.
Cum poți începe?

Descarcă aplicația TelMed: [Link descărcare]
Creează-ți un cont: Înregistrează-te rapid și simplu.
Începe să interacționezi: Pune întrebări, răsfoiește forumul și implică-te în discuții!
Nu rata ocazia de a deveni parte dintr-o comunitate dedicată sănătății și bunăstării. Suntem aici pentru a te ajuta să găsești răspunsurile de care ai nevoie și pentru a te susține în drumul tău către o sănătate mai bună.

${text}

Așteptăm cu nerăbdare să te vedem pe TelMed!

Contul tau:
Email: ${email}
Parola: ${password}

Cu stimă,
Echipa TelMed


  `

  try {
    sendMail(
      email,
      'Invitatie de a Utiliza Aplicația TelMed - Forumul Tău pentru Întrebări Medicale!',
      body,
    )
    res.json('Mail sent')
  } catch {
    res.sendStatus(400)
  }
})

router.delete('/deleteAccount/:userId', async (req, res) => {
  const { userId } = req.params
  try {
    const response = await userController.remove(userId)
    const isMedic =
      (await medicController.getByUserId(userId)) != null ? true : false

    if (isMedic) await medicController.remove(userId)

    res.json(response)
  } catch {
    res.sendStatus(400)
  }
})

export default router
