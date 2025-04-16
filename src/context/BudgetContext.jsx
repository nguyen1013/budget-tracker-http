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
  const [loading, setLoading] = useState(true); // for initial data fetch
  const [addingTransaction, setAddingTransaction] = useState(false); // for form button

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactions = await getTransaction();
        dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  async function addTransaction(transaction) {
    setAddingTransaction(true);

    // Optimistically add to UI with temporary ID
    const tempId = Date.now();
    const tempTransaction = { ...transaction, id: tempId };
    dispatch({ type: "ADD_TRANSACTION", payload: tempTransaction });

    try {
      const data = await addTransactionToServer(transaction);
      // Replace temporary ID with server-assigned ID
      dispatch({ type: "DELETE_TRANSACTION", payload: tempId });
      dispatch({ type: "ADD_TRANSACTION", payload: { ...transaction, id: data.id } });
    } catch (error) {
      console.error("Error adding transaction:", error);
      // Revert the optimistic update
      dispatch({ type: "DELETE_TRANSACTION", payload: tempId });
    } finally {
      setAddingTransaction(false);
    }
  }

  async function deleteTransaction(transactionId) {
    try {
      await deleteTransactionFromServer(transactionId);
      dispatch({ type: "DELETE_TRANSACTION", payload: transactionId });
    } catch (error) {
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
        loading,
        addingTransaction,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}