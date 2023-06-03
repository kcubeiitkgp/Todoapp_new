import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TodoList = ({
  todos,
  toggleComplete,
  removeTodo,
  handleEdit,
  editTaskId,
  updatedTaskText,
  updatedDueDate,
  handleTaskUpdate,
  handleDueDateUpdate,
  handleTaskUpdateSubmit,
  setEditTaskId
}) => {
  return (
    <TransitionGroup className="todo-list">
      {todos.map((todo) => (
        <CSSTransition
          key={todo.id}
          timeout={300}
          classNames="todo-item"
        >
          <li
            className={`todo-item ${editTaskId === todo.id ? 'editing' : ''}`}
          >
            {editTaskId !== todo.id ? (
              <div className="view">
                 <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />

                <label className={`todo-text ${todo.completed ? "completed" : ""}`}>
                  {todo.text}
                </label> 
                <div className="button-container">
                 
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(todo.id)}
                  >
                    
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => removeTodo(todo.id)}
                  >
                    
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
      ))}
    </TransitionGroup>
  );
};

export default TodoList;
