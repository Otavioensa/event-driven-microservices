/* tslint:disable no-var-requires */
require('dotenv').config()
import * as amqp from 'amqplib'
import config from './config'

async function doSomeTask(msg: string) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(msg + ' - processed')
    }, 2000)
  })
}

async function listen() {
  const connection = await amqp.connect(config.amqpUrl)
  const channel = await connection.createChannel()
  const replyChannel = await connection.createConfirmChannel()

  async function processMessage(msg: amqp.ConsumeMessage) {
    const msgBody = msg.content.toString()
    /* tslint:disable no-console */
    console.log('msg', msgBody)
    const result = await doSomeTask(msgBody)
    await replyChannel.publish('processing', 'result', Buffer.from(result))
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


