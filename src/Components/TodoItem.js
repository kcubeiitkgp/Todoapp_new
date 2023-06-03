import React from 'react';
import { CSSTransition } from 'react-transition-group';

const TodoItem = ({ todo, removeTodo, toggleComplete, handleEdit, editTaskId, updatedTaskText, updatedDueDate, handleTaskUpdate, handleDueDateUpdate, handleTaskUpdateSubmit, setEditTaskId }) => {
  const { id, text, completed, due_date } = todo;
  const isLate = new Date() > new Date(due_date) && !completed;

  return (
    <CSSTransition
      key={id}
      timeout={300}
      classNames="todo-item"
    >
      <li className={`todo-item ${isLate ? 'late' : ''} ${editTaskId === id ? 'editing' : ''}`}>
        {editTaskId !== id ? (
          <div className="view">
            <label className={`todo-text ${completed ? "completed" : ""}`}>
              {text}
            </label>
            <div className="button-container">
              <input
                className="checkbox"
                type="checkbox"
                checked={completed}
                onChange={() => toggleComplete(id)}
              />
              <button
                className="edit-button"
                onClick={() => handleEdit(id)}
              >
                
              </button>
              <button
                className="remove-button"
                onClick={() => removeTodo(id)}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="edit-popup">
            <input
              className="input-field"
              type="text"
              value={updatedTaskText}
              onChange={handleTaskUpdate}
            />
            <input
              className="date-field"
              type="date"
              value={updatedDueDate}
              onChange={handleDueDateUpdate}
            />
            <button className="update-task-button" onClick={handleTaskUpdateSubmit}>Update Task</button>
            <button className="cancel-button" onClick={() => setEditTaskId(null)}>Cancel</button>
          </div>
        )}
      </li>
    </CSSTransition>
  );
}

export default TodoItem;
