import { createContext, useEffect, useReducer, useState } from "react";
import { getTransaction, addTransactionToServer, deleteTransactionFromServer } from "../http"

export const BudgetContext = createContext(null);

const initialState = {
  transactions: [],
};

function BudgetReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "SET_TRANSACTIONS": // for fetching database from server and update to transactions state
      return {
        ...state,
        transactions: action.payload, // Replace transactions completely
      };
    default:
      return state;
  }
}


export default function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactions = await getTransaction();
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch (error) {
        setError({ message: "Failed to fetch transactions" });
      } 
    }
  
    fetchTransactions();
  }, []);
  
  // update functions to be asynchronous function
  async function addTransaction(transaction) {
    try {
      const data = await addTransactionToServer(transaction);       
      dispatch({ type: "ADD_TRANSACTION", payload: {...transaction, id: data.id} }); // update id from server for the new transaction
    } catch (error) {
      setError({ message: "Failed to add transaction to server." });
      console.error("Error adding transaction:", error);
    }
  }

  async function deleteTransaction(transactionId) {
    try {
      const data = await deleteTransactionFromServer(transactionId)
      dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
    } catch(error) {
      setError({ message: "Failed to delete transaction from server." });
      console.error("Error deleting transaction:", error);      
    }    
  }

  const saldo = state.transactions.reduce(
    (prev, transaction) => prev + Number(transaction.amount),
    0
  );


  return (
    <BudgetContext.Provider
      value={{
        transactions: state.transactions,
        saldo,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
