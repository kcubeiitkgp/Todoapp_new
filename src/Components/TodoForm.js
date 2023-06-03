

import React, { useState } from "react";

const TodoForm = ({ addTodo, setFilter }) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [enableInput, setEnableInput] = useState(true);
  const [enableAddButton, setEnableAddButton] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleCheckboxChange = (e, field) => {
    const isChecked = e.target.checked;
    if (field === "input") {
      setEnableInput(isChecked);
    } else if (field === "addButton") {
      setEnableAddButton(isChecked);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      if (dueDate && dueDate !== "dd/mm/yyyy") {
        addTodo(inputValue, dueDate);
        setInputValue("");
        setDueDate("");
      } else {
        alert("Please provide a valid due date.");
      }
    }
  };

  const handleFilterClick = (status) => {
    setFilter(status);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <h2 className="todo-heading">Todo App</h2>
        <div className="input-row">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="New Todo"
            className={`input-field ${enableInput ? "" : "disabled"}`}
            disabled={!enableInput}
          />
          <input
            type="checkbox"
            checked={enableInput}
            onChange={(e) => handleCheckboxChange(e, "input")}
          />
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          className={`date-field ${enableInput ? "" : "disabled"}`}
          disabled={!enableInput}
        />
        <div className="input-row">
          <button
            type="submit"
            className={`add-button ${enableAddButton ? "" : "disabled"}`}
            disabled={!enableAddButton}
          >
            Add new task
          </button>
          <input
            type="checkbox"
            checked={enableAddButton}
            onChange={(e) => handleCheckboxChange(e, "addButton")}
          />
        </div>

        <h2 className="todo-heading">Todo List</h2>

        <div className="filter-buttons">
          <button onClick={() => handleFilterClick("all")}>All Tasks</button>
          <button onClick={() => handleFilterClick("pending")}>Pending</button>
          <button onClick={() => handleFilterClick("completed")}>Completed</button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
