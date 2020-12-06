/* tslint:disable no-var-requires */
/* tslint:disable no-console */
require('dotenv').config()
import listenForServiceReply from '../../libs/request-events-listener'
import { processUser } from '../../processors'

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

  await listenForServiceReply.listen(exchange, queueSettings, processUser)
}

export {
  listen,
}
