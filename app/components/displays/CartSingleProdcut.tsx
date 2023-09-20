import Link from "next/link"
import Image from 'next/image'
import { state } from "@/valtio/store";
import { snapshot } from "valtio";
import { useEffect, useState } from "react";
import { ProductWithPrice } from "@/type"
import { CiSquareRemove } from "react-icons/ci"
import PriceTag from "./PriceTag";

export default  function CartSingleProdcut( props ) {
  const { item } = props
  const snap = snapshot(state)
  const [product, setProduct] = useState<ProductWithPrice>()


  async function fetchProduct( priceID:string ) {
    console.log("FETCH Product and Price of PriceID "+priceID)
    const product = await (await fetch("http://localhost:3000/api/stripe/products/retrieve", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify( {priceID} )
    }))
    .json()
    
    return product
  }

  useEffect( () => {
    (async () => { setProduct( await fetchProduct( item.priceID ) )  })();
	  return () => {"component UNMONTED"};
  }, []);

  function removeItem( priceID:string ) {
    state.cartItems = snap.cartItems.filter( item => item.priceID !== priceID)
  }
  function adjustQuantity( priceID:string, num:number ) {
    let item = state.cartItems.find( item => item.priceID === priceID )
    item && (item.quantity += num)
  }


  return(
    
  <div key={item.priceID} className="flex flex-row max-w-[570px] bg-white shade">
    { product ? (
    <>
      <Link href={"http://localhost:3000/shop/products/"+item.priceID} >
        <Image
          src={product?.images[0]}
          // Route of the image file
          height={72} // Desired size with correct aspect ratio
          width={72} // Desired size with correct aspect ratio
          alt="Your Name" 
        />
      </Link>
       {/* PRODICT DESCRIPTION */}
      <div className="flex flex-col relative w-full p-3 pl-5 pr-6">
        <PriceTag unit_amount={product.unit_amount} quantity={item.quantity} />
        <Link href={"http://localhost:3000/shop/products/"+item.priceID}>
          <h2 className="font-md text-lg">{ product?.name }</h2>
        </Link>
        <div>
          <span className="text-sm" >quantity: {item.quantity}</span>
          <button onClick={ (e)=> { e.preventDefault(); adjustQuantity( item.priceID, 1 ) }}>+</button>
          <button onClick={ (e)=> { e.preventDefault(); adjustQuantity( item.priceID, -1 ) }}>-</button>
        </div>
        <button onClick={ (e) => { e.preventDefault(); removeItem(item.priceID); }} className="absolute right-3 ">
          <CiSquareRemove className="w-6 h-6 text-slate-400 hover:text-red-400 transition-all ease-in-out duration-500" />
        </button>
        
      </div>
    </>
    ) : "loading..."}
  </div>
  )
  
}

