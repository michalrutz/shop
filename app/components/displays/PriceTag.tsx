
export default function PriceTag( props: {quantity:number, unit_amount:number} ) {
  const { unit_amount, quantity } = props

  function calculatePrice(unit_amount:number, quantity:number):number {
    return (unit_amount*quantity)
  }

  return(
        <div className='flex relative'>
          <span className='text-md self-start items-start relative top-0.5 -left-0.5'>€</span>
          <span className='text-xl font-semibold'>
            { calculatePrice(unit_amount, quantity).toString().slice( 0, calculatePrice(unit_amount, quantity).toString().length-2 ) }
          </span>
          <span className='text-md self-start items-start relative top-0 left-[1px]'>{ calculatePrice(unit_amount, quantity).toString().slice(-2) }</span>
        </div>
  )
}