/* tslint:disable no-console */
import myEmitter from '../../libs/emiter'

async function processUser(msg: string) {
  console.log('emitting event')
  const resut = JSON.parse(msg)
  await myEmitter.emit(resut.reqId)
  console.log('event emitted')
}

export default processUser