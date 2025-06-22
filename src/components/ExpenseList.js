import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, deleteExpense, editExpense }) => {
  
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="expense-list">
      {sortedExpenses.length === 0 ? (
        <p>No expenses yet!</p>
      ) : (
        sortedExpenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            id={exp.id}
            title={exp.title}
            amount={exp.amount}
            date={exp.date}
            category={exp.category}
            onDelete={() => deleteExpense(exp.id)}
            onEdit={editExpense}
          />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
