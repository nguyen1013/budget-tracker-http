export async function getTransaction () {
  const response = await fetch("https://www.cc.puv.fi/~e2301514/budget-tracker/BudgetTrackerAPI.php")
  const resData = await response.json()


  if (!response.ok) throw new Error("Failed to fetch database")
  
  return resData  

}

export async function addTransactionToServer(transaction) {
  const response = await fetch("https://www.cc.puv.fi/~e2301514/budget-tracker/BudgetTrackerAPI.php", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json"
    }
   })
   
  const resData = await response.json()

  if (!response.ok) throw new Error("Failed to upload transaction")

  return resData
}

export async function deleteTransactionFromServer(id) {
  const response = await fetch("https://www.cc.puv.fi/~e2301514/budget-tracker/BudgetTrackerAPI.php", {
    method: "DELETE",
    body: JSON.stringify({id}),
    headers: {
      "Content-Type": "application/json"
    }
   })
   
  const resData = await response.json()

  if (!response.ok) throw new Error("Failed to delete transaction")

  return resData
}