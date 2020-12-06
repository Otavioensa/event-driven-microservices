/* tslint:disable no-var-requires */
require('dotenv').config()
import express from 'express'
import helmet from  'helmet'
import bodyParser from 'body-parser'
import serviceListerners from './listeners'
import controllers from './controllers'

const app = express()
const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())

app.post('/user', controllers.sendUser)
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }))

serviceListerners.initalizeListeners()

app.listen(PORT, () => {
  /* tslint:disable no-console */
  console.info(`App listening on port ${PORT}`)
})

