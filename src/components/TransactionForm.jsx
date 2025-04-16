import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function TransactionForm() {
  const { addTransaction } = useContext(BudgetContext);

  function handleAdd(event) {
    event.preventDefault();
    // Create a new transaction object,
    const amount = parseFloat(event.target.amount.value);
    const category = event.target.category.value;
    const description = event.target.description.value;
    const newDate = new Date().toISOString().slice(0, 10);// create a new Date() due to format of backend file

    if (!amount || !description) {
      alert("Invalid fields");
      return;
    }

    if (amount && description) {
      const transaction = {
        // id: Math.random(), remove id due to id is created by backend.
        type: category === "salary" ? "income" : "expense", // set type due to category is salary (income) or not (expense)
        amount: category === "salary" ? amount : -amount, // set amount to be negative if type is not income
        description: description,
        date: newDate, 
        category: category,
      };
      addTransaction(transaction);
    }
  }

  return (
    <form onSubmit={handleAdd}>
      <label htmlFor="description">Description</label>
      <input id="description" name="description"></input>

      <label htmlFor="amount">Amount</label>
      <input id="amount" name="amount"></input>

      <label htmlFor="category">Category</label>
      <select id="category" name="category">
        <option value="salary">Salary</option>
        <option value="gasoline">Gasoline</option>
        <option value="food">Food</option>
        <option value="magazines">Magazines</option>
      </select>

      <button type="submit">Add Transaction</button>
    </form>
  );
}
