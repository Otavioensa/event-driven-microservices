/* tslint:disable no-console */

import * as uuid from 'uuid'
import services from '../services'
import myEmitter from '../libs/emiter'

// fix any
async function sendUser(req: any, res: any) {
  const reqId = uuid.v4()
  const deferResponse = () => {
    myEmitter.removeAllListeners(reqId)
    return res.status(200).json({})
  }

  const userData = {
    name: 'John',
    reqId,
  }

  await services.sendUser(userData)
  myEmitter.on(reqId, deferResponse)
}

export = {
  sendUser,
}