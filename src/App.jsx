import { useContext } from 'react';
import './budgettracker.css';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import { BudgetContext } from './context/BudgetContext';

function App() {
  const { loading } = useContext(BudgetContext);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className='container'>
      <h1>Budget Tracker</h1>
      <Header />
      <TransactionForm />
      <TransactionList />
    </div>
  );
}

export default App;
