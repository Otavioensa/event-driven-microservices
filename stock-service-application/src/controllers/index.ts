/* tslint:disable no-console */

import services from '../services'

// fix any
async function getProducts(req: any, res: any) {
  const products = await services.getProducts()
  return products
}

export = {
  getProducts,
}