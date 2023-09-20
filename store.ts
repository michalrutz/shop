import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


type Cart = {
  cartItems: Product[]
  setCartItems: (val:Product[]) => void
  removeItem: (id:string) => void
  quantityAll: number
  setQuantityAll: (val:number) => void
  //setQuantity: (id:string, quantity: number) => void
}
type Product = {
  priceID: string
  quantity: number
}

export const useShopStore = create<Cart>()(
  persist(
    (set, get) => ({
      cartItems: [],
      setCartItems: (val) => set(() => ({ cartItems: val })),
      removeItem: (id:string) => set(
        (store) => ({ cartItems: store.cartItems.filter( item => item.priceID !== id ) })
      ),
      quantityAll: 0,
      setQuantityAll: (val) => set( () => ({ quantityAll:val }) ),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage ), // (optional) by default, 'localStorage' is used
    }
  )
)
