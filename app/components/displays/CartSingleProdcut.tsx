import Link from "next/link"
import Image from 'next/image'
import { state } from "@/valtio/store";
import { snapshot } from "valtio";
import { useEffect, useState } from "react";
import { ProductWithPrice, Price } from "@/type"
import { SmallRound } from "../buttons/SmallRound";


export default  function CartSingleProdcut( {item}: { item: Price } ) {
  const snap = snapshot(state)
  const [product, setProduct] = useState<ProductWithPrice>()

  async function fetchProduct( priceID:string ) {
    console.log("FETCH Product and Price of PriceID "+priceID)
    const product = await (await fetch("/api/stripe/products/retrieve", {
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
  <div key={item.priceID} className="flex flex-row border shade bg-white">
    { product ? (
    <>
      <Link href={"/shop/products/"+item.priceID} className="min-w-[128px] flex flex-col" >
      <div style={{
        backgroundColor: "rgb(242 242 242)",
        backgroundImage: `url(${product?.images[0]})`,
        width: "128px",
        height: "128px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        border: "0",

        }}></div>
      </Link>
       {/* PRODICT DESCRIPTION */}
      <div className=" flex flex-col justify-between w-full p-3 pl-5 pr-6 font-sans text-slate-700 font-normal text-sm">

        <div className="flex flex-row justify-between w-full " >
            <Link href={"/shop/products/"+item.priceID} className="flex flex-col">
              <h2 className="text-base font-semibold pb-1">{ product?.name }</h2>
            </Link>
            {/* PRICE COL */}
            <div className="flex flex-col items-end" >
              <span className="text-base font-semibold pb-1">{ Number.parseFloat((product?.unit_amount*item.quantity).toString().slice(0,-2)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }</span>
              { item.quantity > 1 && <span className="text-slate-400 border-t">{ Number.parseFloat((product?.unit_amount).toString().slice(0,-2)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) } each</span>}
            </div>
        </div>
        {/* QUANTITY ADDJUSTER */} 
        <div className="w-full flex flex-row  text-slate-400 border-t">
          <div className="flex flex-row pt-1.5 ">
            <div className="flex flex-row gap-1 items-center pr-2" >
              <p>Quantity: </p>
              <SmallRound quantity={item.quantity} setQuantity={ ()=>adjustQuantity(item.priceID, -1) } text={"-"} />
              <span className="w-5 text-center text-normal">{item.quantity}</span>
              <SmallRound quantity={item.quantity} setQuantity={ ()=>adjustQuantity(item.priceID, 1) } text={"+"} />
            </div>
            {/* REMOVE BTTN */} 
            <div onClick={ (e) => { e.preventDefault(); removeItem(item.priceID)}} className="border-l pl-2">Remove</div>
          </div>
        </div>
      </div>
    </>
    ) : "loading..."}
  </div>
  )
  
}

