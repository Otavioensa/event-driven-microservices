import * as amqp from 'amqplib'
import config from '../config'

interface QueueSettings  {
  name: string
  key: string
}

type Callback = (msg: string) => void

async function listen(
  exchange: string,
  requestQueue: QueueSettings,
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

  await channel.assertExchange(exchange, 'direct', { durable: true })

  await Promise.all([
    channel.assertQueue(requestQueue.name, { durable: true }),
    channel.assertQueue(responseQueue.name, { durable: true }),
  ])

  await Promise.all([
    channel.bindQueue(requestQueue.name, exchange, requestQueue.key),
    channel.bindQueue(responseQueue.name, exchange, responseQueue.key),
  ])

  await channel.prefetch(1)
  await channel.consume(responseQueue.name, processMsg)
}

export = {
  listen,
}
