/* tslint:disable no-var-requires */
/* tslint:disable no-console */
require('dotenv').config()
import * as amqp from 'amqplib'
import config from './config'

async function doSomeTask(msg: string) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(msg + ' - processed')
    }, 125)
  })
}

async function listen() {
  const connection = await amqp.connect(config.amqpUrl)
  const channel = await connection.createChannel()
  const replyChannel = await connection.createConfirmChannel()

  async function processMessage(msg: amqp.ConsumeMessage) {
    console.log('msg',  msg.content.toString())
    const result = await doSomeTask(msg.content.toString())
    const payload = JSON.parse(msg.content.toString())
    const messagePayload = {
      ...payload,
      result,
    }
    const stringifiedResult = JSON.stringify(messagePayload)
    await replyChannel.publish('processing', 'result', Buffer.from(stringifiedResult))
    await channel.ack(msg)
  }

  await channel.assertExchange('processing', 'direct', { durable: true })

  await Promise.all([
    channel.prefetch(2),
    channel.assertQueue('processing.requests', { durable: true }),
    channel.assertQueue('processing.results', { durable: true }),
  ])

  await Promise.all([
    channel.bindQueue('processing.requests','processing', 'request'),
    channel.bindQueue('processing.results','processing', 'result'),
  ])

  await channel.consume('processing.requests', processMessage)
}

listen()


