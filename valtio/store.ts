import { proxy, subscribe } from 'valtio';
import { ProductWithPrice } from "@/type";

type Product = {
  priceID: string;
  quantity: number;
};

let storedData = null;

// Check if localStorage is available in the current environment
if (typeof localStorage !== 'undefined') {
  // Attempt to retrieve 'foo' from localStorage
  storedData = localStorage.getItem('foo');
}

// Create the state object with the Product type
export const state = proxy<{ cartItems: Product[] }>(
  storedData ? JSON.parse(storedData) : { cartItems: [] }
);

subscribe(state, () => {
  localStorage.setItem('foo', JSON.stringify(state));
});
