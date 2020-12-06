/* tslint:disable no-console */

async function processUser(msg: string) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log('finished processing')
      resolve(msg)
    }, 125)
  })
}

export {
  processUser,
}