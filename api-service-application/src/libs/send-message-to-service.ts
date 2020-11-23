/* tslint:disable no-console */
import amqp from 'amqplib'
import config from '../config'

class SendMessageToService {
  protected connection: amqp.Connection
  protected channel: amqp.ConfirmChannel

  constructor () {
    this.initialize()
  }

  async initialize () {
    this.connection = await amqp.connect(config.amqpUrl)
    this.channel = await this.connection.createConfirmChannel()
  }

  async send (stringifiedPayload: string){
    await this.channel.publish('processing', 'request', Buffer.from(stringifiedPayload, 'utf-8'))
  }
}

export default new SendMessageToService()
