import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'

import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { authorsRouter, postsRouter, postRouter, visitsRouter } from './routers.js'

dotenv.config()
const PORT = process.env.PORT || 5000

mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.swmsg.mongodb.net/lselawreview?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error:'))
db.once('open', () => console.log('Connection established'))

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('view engine', 'ejs')

const authMiddleware = (req, res, next) => {

    let token = req.cookies['session-token']

    let user = {}
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        })
        const payload = ticket.getPayload()
        user.name = payload.name
        user.email = payload.email
        user.picture = payload.picture
        if(payload.email !== 'lselawreview@gmail.com') {
            res.redirect(403, `/login?dest=${req.url}&error='Please log in with the shared gmail account!'`)
        }
      }
      verify()
      .then(()=>{
          req.user = user
          next()
      })
      .catch(e=> {
          res.redirect(401, `/login?dest=${req.url}`)
      })
}

app.post('/login', (req,res)=>{
    let token = req.body.token

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        })
        const payload = ticket.getPayload()
        if(payload.email !== 'lselawreview@gmail.com') {
            throw new Error('Your email is unauthorised. Please log in again using the shared gmail account.')
        }
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token)
          res.status(200).send()
      })
      .catch(e => {
          console.log(e)
          res.status(403).send(e.message)
      })

})

app.get('/login', (req, res) => {
    return res.render('auth', { client_id: process.env.GOOGLE_CLIENT_ID, dest: req.query.dest, error: req.query.error })
})

app.use(authMiddleware)

app.use('/api/authors', authorsRouter)
app.use('/api/posts', postsRouter)
app.use('/api/post', postRouter)
app.use('/api/visits', visitsRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

if(process.env.NODE_ENV === 'development'){
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`Started listening on port ${PORT}`))

