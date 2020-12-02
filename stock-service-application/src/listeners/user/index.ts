/* tslint:disable no-var-requires */
/* tslint:disable no-console */
require('dotenv').config()
import listenForServiceReply from '../../libs/listen-for-service-request'

// move to processors
async function doSomeTask(msg: string) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve(msg + ' - processed')
    }, 125)
  })
}

async function listen() {
  const queueSettings = {
    request: {
      name: 'processing.requests',
      key: 'request',
    },
    response: {
      name: 'processing.results',
      key: 'result',
    },
  }

  const exchange = 'processing'

  await listenForServiceReply.listen(exchange, queueSettings, doSomeTask)
}

export {
  listen,
}
