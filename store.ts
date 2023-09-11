import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


type Cart = {
  cartItems: []
  isOpen: boolean
  paymentIntentsID: string
  setPaymentIntentsID: (val:string) => void
}

export const useShopStore = create<Cart>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isOpen: false,
      paymentIntentsID: "",
      setPaymentIntentsID: (val) => set(() => ({ paymentIntentsID: val })),
    }),
    {
      name: 'food-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage ), // (optional) by default, 'localStorage' is used
    }
  )
)
