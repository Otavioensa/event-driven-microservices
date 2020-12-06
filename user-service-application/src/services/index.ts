/* tslint:disable no-console */
import sendMessageToService from '../libs/send-message-to-service'

interface User {
  name: string
}

async function sendUser (userData: User){
  const stringifiedPayload = JSON.stringify(userData)
  await sendMessageToService.send(stringifiedPayload)
  console.log('message sent from api')
}

export = {
  sendUser
}