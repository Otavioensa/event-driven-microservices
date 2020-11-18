import userListener from './user'

async function initalizeListerners() {
  // initialize all listeners
  // ...
  await userListener.listen()
}

export = {
  initalizeListerners,
}