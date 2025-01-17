import React, { useState, useEffect } from "react";
import "./Expenseform.css";

const Expenseform = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [item, setItem] = useState("Petrol");
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_URL =
    "https://reexpensetracker-default-rtdb.firebaseio.com/expenses.json";

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data) {
          const fetchedExpenses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setExpenses(fetchedExpenses);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);





 const addExpenseHandler = async () => {
   if (!money || !description) {
     alert("Please fill in all required fields.");
     return;
   }

   const newExpense = { money, description, item };
   try {
     const response = await fetch(API_URL, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newExpense),
     });
     const data = await response.json();
     setExpenses([...expenses, { id: data.name, ...newExpense }]);
     resetForm();
     alert("Expense added successfully!");
   } catch (error) {
     alert("Error adding expense: " + error.message);
   }
 };







  const deleteExpenseHandler = async (id) => {
    try {
      await fetch(
        `https://reexpensetracker-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setExpenses(expenses.filter((expense) => expense.id !== id));
      alert("Expense deleted successfully!");
    } catch (error) {
      alert("Error deleting expense: " + error.message);
    }
  };







  const editExpenseHandler = async () => {
    const updatedExpense = { money, description, item };
    try {
      await fetch(
        `https://reexpensetracker-default-rtdb.firebaseio.com/expenses/${editId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExpense),
        }
      );
      setExpenses(
        expenses.map((expense) =>
          expense.id === editId ? { ...expense, ...updatedExpense } : expense
        )
      );
      resetForm();
      alert("Expense updated successfully!");
    } catch (error) {
      alert("Error updating expense: " + error.message);
    }
  };

  const startEditHandler = (expense) => {
    setMoney(expense.money);
    setDescription(expense.description);
    setItem(expense.item);
    setEditId(expense.id);
  };

  const resetForm = () => {
    setMoney("");
    setDescription("");
    setItem("Petrol");
    setEditId(null);
  };

  return (
    <div className="expense-form-container">
      <h3 className="expense-form-heading">Money Spent</h3>
      <input
        className="expense-form-input"
        required
        type="number"
        placeholder="Money spent"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
      />
      <h3 className="expense-form-heading">Add Description</h3>
      <input
        className="expense-form-input"
        type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="expense-form-select"
        name="item"
        required
        id="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      >
        <option value="Petrol">Petrol</option>
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
      </select>
      <button
        onClick={editId ? editExpenseHandler : addExpenseHandler}
        className="expense-form-button"
      >
        {editId ? "Update Expense" : "Add Expense"}
      </button>
      <h3 className="expense-form-heading">Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-list-item">
            {expense.money} - {expense.description} - {expense.item}
            <button
              className="delete-button"
              onClick={() => deleteExpenseHandler(expense.id)}
            >
              Delete
            </button>
            <button
              className="edit-button"
              onClick={() => startEditHandler(expense)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenseform;
