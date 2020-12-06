import userListener from './user'

async function initalizeListeners() {
  // initialize all listeners
  // ...
  await userListener.listen()
}

export = {
  initalizeListeners,
}