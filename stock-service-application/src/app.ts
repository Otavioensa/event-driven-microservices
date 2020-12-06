/* tslint:disable no-var-requires */
/* tslint:disable no-console */
require('dotenv').config()
import express from 'express'
import helmet from  'helmet'
import bodyParser from 'body-parser'
import serviceListerners from './listeners'
import controllers from './controllers'
import config from './config'

const app = express()
const PORT = config.appPort

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())

app.post('/products', controllers.getProducts)
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }))

serviceListerners.initalizeListeners()

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

