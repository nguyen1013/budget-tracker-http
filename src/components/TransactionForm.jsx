import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export default function TransactionForm() {
    const { addTransaction } = useContext(BudgetContext);

    function handleAdd(event) {
        event.preventDefault();
        const amount = parseFloat(event.target.amount.value)
        const category = event.target.category.value
        const transaction = {
            type: (category === "salary") ? "income" : "expense",
            amount: (category === "salary") ? amount : -amount,
            description: event.target.description.value,
            date: new Date().toISOString().slice(0, 10), 
            category: category
        }        
        addTransaction(transaction);
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