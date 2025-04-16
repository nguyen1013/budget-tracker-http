import { useContext } from 'react'
import { BudgetContext } from '../context/BudgetContext'

function Header() {
  const { saldo } = useContext(BudgetContext)

  return (
    <div className='balance-box'>
      <h3>Balance</h3>
      <p className='balance' id='balance'>{saldo}€</p>
    </div>
  )
}
export default Header