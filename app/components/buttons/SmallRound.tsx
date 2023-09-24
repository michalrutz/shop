export function SmallRound( {quantity, setQuantity, text}: {quantity:number, setQuantity:Function, text:string} ) {

  return (
  <>
    <button 
    className="
      flex justify-center relative shade
      bg-white w-6 h-6 rounded-full
      transition-all ease-in-out transition-duration: 1000ms;
      disabled:opacity-20 "
      disabled={ text === "-" && quantity === 1 || text === "+" && quantity === 10 }
      onClick = { (e) => { e.preventDefault(); setQuantity() } }
    >
      <span className="absolute flex font-bold  text-slate-600 hover:text-slate-800">
        {text}
      </span>
    </button>
  </>
  )
}