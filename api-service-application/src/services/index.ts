import * as uuid from 'uuid'
import sendMessageToService from '../libs/send-message-to-service'

interface User {
  name: string
}

async function sendUser (userData: User){
  const payload = {
    ...userData,
    reqId: uuid.v4(),
  }
  const stringifiedPayload = JSON.stringify(payload)
  await sendMessageToService.send(stringifiedPayload)
  /* tslint:disable no-console */
  console.log('message sent from api')
}

export = {
  sendUser
}