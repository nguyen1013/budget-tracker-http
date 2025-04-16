import './budgettracker.css'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import BudgetProvider from './context/BudgetContext'

function App() {
  

  return (
    <BudgetProvider>
      <div className='container'>
        <h1 className=''>Budget Tracker</h1>
        <div className='balance-box'>
          <h3>Balance</h3>
          <p className='balance' id='balance'>€</p>
        </div>
        <TransactionForm />
        <TransactionList />
      </div>
    </BudgetProvider>
  )
}

export default App
