import React from "react";

const ExpenseFilter = ({ filters, setFilters, expenses }) => {
  const uniqueCategories = Array.from(
    new Set(expenses.map((e) => e.category?.trim()))
  ).filter(Boolean);

  return (
    <div className="card p-3 mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-md-4">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={filters.startDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={filters.endDate}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="All">All</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
