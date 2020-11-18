import amqp from 'amqplib'
import config from '../config'

class SendMessageToService {
  connection: amqp.Connection
  constructor () {
    this.initialize()
  }

  async initialize () {
    this.connection = await amqp.connect(config.amqpUrl)
  }

  async send (stringifiedPayload: string){
    const channel = await this.connection.createConfirmChannel()
    await channel.publish('processing', 'request', Buffer.from(stringifiedPayload, 'utf-8'))
    await channel.close()
  }
}

export default new SendMessageToService()
