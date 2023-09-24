export type Price = {
  priceID: string
  quantity: number
}

export type ProductWithPrice = {
  id: string,
  name: string,
  unit_amount: number,
  images: [string],
  currency: string,
  priceID: string,
  quantity: number,
  description: string,
  metadata: {}
}

export interface Session {
  user: {
    name: string
    email: string
    image: string
    uid: string
  }
}