import * as amqp from 'amqplib'
import config from '../config'
import { IHandler, IQueueSettings} from '../interfaces/request-events-listener'

async function listen(
  exchange: string,
  queueSettings: IQueueSettings,
  handler: IHandler,
) {
  const connection = await amqp.connect(config.amqpUrl)
  const channel = await connection.createChannel()
  const replyChannel = await connection.createConfirmChannel()

  async function processMsg(msg: amqp.ConsumeMessage) {
    const stringifiedMessage = msg.content.toString()
    await handler(stringifiedMessage)
    const response = Buffer.from(stringifiedMessage)
    await replyChannel.publish(
      exchange,
      queueSettings.response.key,
      response,
    )
    await channel.ack(msg)
  }

  await Promise.all([
    channel.assertExchange(exchange, 'direct', { durable: true }),
    channel.assertQueue(queueSettings.request.name, { durable: true }),
    channel.assertQueue(queueSettings.response.name, { durable: true }),
  ])

  await Promise.all([
    channel.bindQueue(
      queueSettings.request.name,
      exchange,
      queueSettings.request.key,
    ),
    channel.bindQueue(
      queueSettings.response.name,
      exchange,
      queueSettings.response.key,
    ),
  ])

  // export prefetch to config and env/vars
  await channel.prefetch(2)
  await channel.consume(queueSettings.request.name, processMsg)
}

export = {
  listen,
}
