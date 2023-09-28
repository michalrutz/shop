export type Price = {
  priceID: string
  quantity: number
}

export interface PriceObject{
  product: string,
  id: string,
}

export interface Product  {
  id: string,
  name: string,
  images: string[],
  description: string | null,
  metadata: Metadata
}

interface Metadata {
  date: number,
  technique: string
}

export type ProductWithPrice = {
  id: string,
  name: string,
  unit_amount: number,
  images: string[],
  currency: string,
  priceID: string,
  quantity: number,
  description: string,
  metadata: {}
}

export type SingleProductWithPrice = {
  id: string,
  name: string,
  unit_amount: number,
  images: string[],
  currency: string,
  priceID: string,
  description: (string | undefined),
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