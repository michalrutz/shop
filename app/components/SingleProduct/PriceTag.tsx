
export default function PriceTag( props: {quantity:number, unit_amount:number} ) {
  const { unit_amount, quantity } = props

  function calculatePrice(unit_amount:number, quantity:number):number {
    return (unit_amount*quantity)
  }

  return(
          <span className='text-xl font-semibold'>
            { calculatePrice(unit_amount, quantity).toString().slice( 0, calculatePrice(unit_amount, quantity).toString().length-2 ) }
            ,{ calculatePrice(unit_amount, quantity).toString().slice(-2) } €
          </span>
  )
}