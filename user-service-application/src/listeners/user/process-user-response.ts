/* tslint:disable no-console */
import myEmitter from '../../libs/emiter'

async function processUser(msg: string) {
  const result = JSON.parse(msg)
  console.log('result req id', result.reqId)
  console.log('result req id', result.name)
  console.log('new message arrived, emitting event', result)
  await myEmitter.emit(result.reqId)
  console.log('event emitted')
}

export default processUser