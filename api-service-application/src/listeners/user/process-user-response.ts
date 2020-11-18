async function processUser(msg: string) {
  /* tslint:disable no-console */
  console.log(msg)
  return new Promise((resolve) => {
    resolve(1)
  })
}

export default processUser