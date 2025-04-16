export async function getTransaction() {
  try {
    const response = await fetch("https://www.cc.puv.fi/~e2301514/budget-tracker/BudgetTrackerAPI.php");
    const resData = await response.json();

    if (!response.ok) throw new Error("Failed to fetch database");

    return resData;
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    return []
  }
}

export async function addTransactionToServer(transaction) {
  try {
    const response = await fetch("https://www.cc.puv.fi/~e2301514/budget-tracker/BudgetTrackerAPI.php", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const resData = await response.json();

    if (!response.ok) throw new Error("Failed to upload transaction");

    return resData;
  } catch (error) {
    console.error("Error uploading transaction:", error.message);
  }
}

export async function deleteTransactionFromServer(id) {
  try {
    const response = await fetch("https://www.cc.puv.fi/~e2301514/budget-tracker/BudgetTrackerAPI.php", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const resData = await response.json();

    if (!response.ok) throw new Error("Failed to delete transaction");

    return resData;
  } catch (error) {
    console.error("Error deleting transaction:", error.message);
  }
}
