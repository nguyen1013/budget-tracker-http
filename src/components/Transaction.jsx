import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Confirm from "./Confirm";

export default function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(BudgetContext);
  const [showConfirm, setShowConfirm] = useState(false);

  //console.log(transaction);
  return (
    <>
      <li className={transaction.amount > 0 ? "income" : "expense"}>
        {transaction.description}{" "}
        <button onClick={() => setShowConfirm(true)}>X</button>{" "}
      </li>

      {showConfirm && (
        <Confirm
          message="Are you sure?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            deleteTransaction(transaction.id);
            setShowConfirm(false);
          }}
        />
      )}
    </>
  );
}
