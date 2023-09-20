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
  description: string,
  metadata: {}
}