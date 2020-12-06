import listenForServiceReply from '../../libs/listen-for-service-reply'
import processUser from './process-user-response'

async function listen() {
  const exchangeName = 'processing'
  const responseQueue = {
    name: 'processing.results',
    key: 'result',
  }
  await listenForServiceReply.listen(exchangeName, responseQueue, processUser)
}

export = {
  listen,
}