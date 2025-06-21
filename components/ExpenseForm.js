import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || !date || !category.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Amount must be a positive number.");
      return;
    }

    addExpense({
      id: Date.now(),
      title: title.trim(),
      amount: numericAmount,
      date,
      category: category.trim(),
    });

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        min="1"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
