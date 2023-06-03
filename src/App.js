import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";
import { CSSTransition, TransitionGroup } from "react-transition-group";  // added import
import './App.css';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editTaskId, setEditTaskId] = useState(null);
  const [updatedTaskText, setUpdatedTaskText] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const addTodo = (text, dueDate) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      due_date: dueDate
    };
    axios.post('http://localhost:5000/todos', newTodo)
      .then(response => {
        setTodos([...todos, newTodo]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const removeTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(response => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toggleComplete = (id) => {
  const todoToToggle = todos.find((todo) => todo.id === id);

  if (!todoToToggle) return;

  const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
  
  axios.put(`http://localhost:5000/todos/${id}`, updatedTodo)
    .then(response => {
      const updatedTodos = todos.map((todo) => todo.id === id ? updatedTodo : todo);
      setTodos(updatedTodos);
    })
    .catch(error => {
      console.error(error);
    });
};


  const updateDueDate = (id, newDate) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, due_date: newDate };
        axios.put(`http://localhost:5000/todos/${id}`, updatedTodo)
          .then(response => {
            return updatedTodo;
          })
          .catch(error => {
            console.error(error);
          });
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    setEditTaskId(id);
    const todo = todos.find((todo) => todo.id === id);
    setUpdatedTaskText(todo ? todo.text : "");
    setUpdatedDueDate(todo ? todo.due_date : "");
  };

  const handleTaskUpdate = (e) => {
    setUpdatedTaskText(e.target.value);
  };

  const handleDueDateUpdate = (e) => {
    setUpdatedDueDate(e.target.value);
  };

  const handleTaskUpdateSubmit = () => {
    if (editTaskId) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTaskId) {
          return { ...todo, text: updatedTaskText, due_date: updatedDueDate };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditTaskId(null);
      setUpdatedTaskText("");
      setUpdatedDueDate("");
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredTodos = filter === "all"
    ? todos
    : (filter === "completed") 
      ? todos.filter(todo => todo.completed)
      : todos.filter(todo => !todo.completed);
  return (
    <div className="container">
      <TodoForm addTodo={addTodo} setFilter={handleFilterChange} />
      <TransitionGroup>
        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          updateDueDate={updateDueDate}
          handleEdit={handleEdit}
          editTaskId={editTaskId}
          updatedTaskText={updatedTaskText}
          updatedDueDate={updatedDueDate}
          handleTaskUpdate={handleTaskUpdate}
          handleDueDateUpdate={handleDueDateUpdate}
          handleTaskUpdateSubmit={handleTaskUpdateSubmit}
          setEditTaskId={setEditTaskId}
          setUpdatedTaskText={setUpdatedTaskText}
          setUpdatedDueDate={setUpdatedDueDate}
          setTodos={setTodos}
        />
      </TransitionGroup>
    </div>
  );
};

export default App;
