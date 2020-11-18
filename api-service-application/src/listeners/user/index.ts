import listenForServiceReply from '../../libs/listen-for-service-reply'
import processUser from './process-user-response'

async function listen() {
  const requestQueue = {
    name: 'processing.requests',
    key: 'request',
  }
  const responseQueue = {
    name: 'processing.results',
    key: 'result',
  }
  await listenForServiceReply.listen('processing', requestQueue, responseQueue, processUser)
}

export = {
  listen,
}