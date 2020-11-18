import services from '../services'

// fix any
async function sendUser(req: any, res: any) {
  const userData = {
    name: 'John',
  }
  await services.sendUser(userData)
  return res.status(200).json({})
}

export = {
  sendUser,
}