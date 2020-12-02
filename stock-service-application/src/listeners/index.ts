import * as userListener from './user/index'

async function initalizeListeners() {
  // initialize all listeners
  await userListener.listen()
}

export = {
  initalizeListeners,
}