import * as amqp from 'amqplib'
import config from '../config'

interface QueueSettings  {
  name: string
  key: string
}

type Callback = (msg: string) => void

async function listen(
  exchangeName: string,
  responseQueue: QueueSettings,
  handler: Callback
) {
  const connection = await amqp.connect(config.amqpUrl)
  const channel = await connection.createChannel()

  async function processMsg(msg: amqp.ConsumeMessage) {
    const result = msg.content.toString()
    await handler(result)
    await channel.ack(msg)
  }

  await Promise.all([
    channel.assertExchange(exchangeName, 'direct', { durable: true }),
    channel.assertQueue(responseQueue.name, { durable: true }),
  ])

  await channel.bindQueue(responseQueue.name, exchangeName, responseQueue.key)
  // export prefetch to config
  await channel.prefetch(2)
  await channel.consume(responseQueue.name, processMsg)
}

export = {
  listen,
}
