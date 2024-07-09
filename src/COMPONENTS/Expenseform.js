import React, { useState, useEffect } from "react";
import "./Expenseform.css";

const Expenseform = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [item, setItem] = useState("Petrol");
  const [expenses, setExpenses] = useState([]);

  const API_URL =
    "https://reexpensetracker-default-rtdb.firebaseio.com/expenses.json";

  // Fetch expenses on component mount
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
      setMoney("");
      setDescription("");
      setItem("Petrol");
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

  const editExpenseHandler = async (id) => {
    const updatedExpense = { money, description, item };
    try {
      await fetch(
        `https://reexpensetracker-default-rtdb.firebaseio.com/expenses/${id}.json`,
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
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );
      setMoney("");
      setDescription("");
      setItem("Petrol");
      alert("Expense updated successfully!");
    } catch (error) {
      alert("Error updating expense: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Money spent"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
        required
      />
      <h3>Add Description</h3>
      <input
        type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        name="item"
        id="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      >
        <option value="Petrol">Petrol</option>
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
      </select>
      <button onClick={addExpenseHandler}>Add Expense</button>
      <h3>Expenses</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.money} - {expense.description} - {expense.item}
            <button onClick={() => deleteExpenseHandler(expense.id)}>
              Delete
            </button>
            <button onClick={() => editExpenseHandler(expense.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenseform;
