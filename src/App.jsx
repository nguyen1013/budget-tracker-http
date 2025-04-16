import './budgettracker.css'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Header from './components/Header'
import BudgetProvider from './context/BudgetContext'

function App() {

  return (
    <BudgetProvider>
      <div className='container'>
        <h1 className=''>Budget Tracker</h1>
        <Header />
        <TransactionForm />
        <TransactionList />
      </div>
    </BudgetProvider>
  )
}

export default App
