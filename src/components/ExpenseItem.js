import React, { useState } from "react";
import "./ExpenseItem.css";

const ExpenseItem = ({ id, title, amount, date, category, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedDate, setEditedDate] = useState(date);

  const handleSave = () => {
    onEdit(id, {
      id,
      title: editedTitle,
      amount: editedAmount,
      date: editedDate,
      category: category, 
    });
    setIsEditing(false);
  };

  return (
    <div className="expense-item">
      {isEditing ? (
        <div>
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <h3>{title}</h3>
          <p>{amount}</p>
          <small>{new Date(date).toLocaleDateString()}</small>
        </div>
      )}

      <div className="d-flex gap-2 mt-2">
        <button
          className="btn btn-danger btn-sm"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
