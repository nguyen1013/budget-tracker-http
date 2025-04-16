import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Modal from "./Modal";
import Error from "./Error";

export default function TransactionForm() {
  const { addTransaction, addingTransaction } = useContext(BudgetContext);
  const [invalidInput, setInvalidInput] = useState(false);

  function handleAdd(event) {
    event.preventDefault();
    const amount = parseFloat(event.target.amount.value);
    const category = event.target.category.value;
    const description = event.target.description.value;
    const newDate = new Date().toISOString().slice(0, 10);

    if (!amount || !description) {
      setInvalidInput(true);
      return;
    }

    const transaction = {
      type: category === "salary" ? "income" : "expense",
      amount: category === "salary" ? amount : -amount,
      description,
      date: newDate,
      category,
    };

    addTransaction(transaction);
    event.target.reset();
  }

  function handleError() {
    setInvalidInput(false);
  }

  return (
    <>
      <Modal open={invalidInput} onClose={handleError}>
        {invalidInput && (
          <Error
            title="An error occurred"
            message="Invalid input value"
            onConfirm={handleError}
          />
        )}
      </Modal>

      <form onSubmit={handleAdd}>
        <label htmlFor="description">Description</label>
        <input id="description" name="description" />

        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" type="number" />

        <label htmlFor="category">Category</label>
        <select id="category" name="category">
          <option value="salary">Salary</option>
          <option value="gasoline">Gasoline</option>
          <option value="food">Food</option>
          <option value="magazines">Magazines</option>
        </select>

        <button type="submit" disabled={addingTransaction}>
          {addingTransaction ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </>
  );
}

