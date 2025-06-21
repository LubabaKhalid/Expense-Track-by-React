import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import ExpenseFilter from "./components/ExpenseFilter";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "All",
  });

  useEffect(() => {
    const data = localStorage.getItem("expenses");
    if (data) setExpenses(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((exp) => (exp.id === id ? updatedExpense : exp))
    );
  };

  const filteredExpenses = expenses.filter((e) => {
    const date = new Date(e.date);
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;

    const matchDate = (!start || date >= start) && (!end || date <= end);
    const matchCategory =
      filters.category === "All" || e.category === filters.category;

    return matchDate && matchCategory;
  });

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Personal Expense Tracker</h1>

      <ExpenseForm addExpense={addExpense} />
      <ExpenseFilter
        filters={filters}
        setFilters={setFilters}
        expenses={expenses}
      />
      <Summary expenses={filteredExpenses} />
      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
    </div>
  );
}

export default App;
