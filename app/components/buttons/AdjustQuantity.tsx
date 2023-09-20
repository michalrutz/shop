export function AdjustQuantity ( { quantity, setQuantity }:{ quantity:number, setQuantity:Function} ) {

  return(
    <div className="
    bg-transparent h-10 max-w-[110px] flex gap-1 items-center
    p-4
    border border-slate-300 rounded-lg  ">
    <SmallButton quantity={quantity} setQuantity={ ()=> setQuantity(quantity-1) } text={"-"} />
    <span className="w-6 font-extrabold font-mono text-slate-700 text-center ">
    {quantity}
    </span>
    <SmallButton quantity={quantity} setQuantity={ ()=> setQuantity(quantity+1) } text={"+"} />
    </div>
  )  
}


function SmallButton( {quantity, setQuantity, text}: {quantity:number, setQuantity:Function, text:string} ) {

  return (
  <>
    <button 
    style={{ boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.2)' }}
    className="
      flex justify-center relative
      bg-white w-6 h-6 rounded-full
      transition-all ease-in-out transition-duration: 1000ms;
      disabled:opacity-40 "
      disabled={text === "-" && quantity === 1 || text === "+" && quantity === 10}
      onClick = { (e) => {
      e.preventDefault()
      setQuantity()
    } }
    >
      <span className="absolute flex text-l font-bold  text-slate-700">
      {text}
      </span>
    </button>
  </>
  )
}
