'use client'
import React, { useState, useEffect } from 'react';
import s from './todo.module.scss';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showCompleted, setShowCompleted] = useState(false); // New state for showing completed tasks

  const addTask = () => {
    fetch('https://6575af18b2fbb8f6509d5f97.mockapi.io/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTaskTitle }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        return response.json();
      })
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTaskTitle('');
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch('https://6575af18b2fbb8f6509d5f97.mockapi.io/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteTask = (taskId) => {
    fetch(`https://6575af18b2fbb8f6509d5f97.mockapi.io/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error('Error deleting task', error));
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setNewTitle('');
  };

  const handleUpdateTask = () => {
    const { id } = selectedTask;
    fetch(`https://6575af18b2fbb8f6509d5f97.mockapi.io/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
        );
        closeModal();
      })
      .catch((error) => console.error('Error updating task', error));
  };

  const handleToggleCompletion = (taskId, completed) => {
    fetch(`https://6575af18b2fbb8f6509d5f97.mockapi.io/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, completed: !completed } : task
          )
        );
      })
      .catch((error) => console.error('Error updating task', error));
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className={s.cont1}>
      <div className={s.filterContainer}>
        <label className={s.toggleLabel}>
          <input 
            type="checkbox"
            checked={showCompleted}
            onChange={toggleShowCompleted}
          />
          Show Completed Tasks
        </label>
      </div>
      <input
        className={s.input}
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={addTask} className={s.button}>
        Add Task
      </button>
      <ul>
        {tasks
          .filter((task) => (showCompleted ? true : !task.completed))
          .map((task) => (
            <li key={task.id} className={`${s.taskItem} ${task.completed ? s.completedTask : ''}`}>
              {task.title}
              <button onClick={() => handleDeleteTask(task.id)} className={s.deleteButton}>
                Delete
              </button>
              <button onClick={() => openModal(task)} className={s.updateButton}>
                Update
              </button>
              <label className={s.toggleLabel}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task.id, task.completed)}
                />
                Completed
              </label>
            </li>
          ))}
      </ul>

      {isModalOpen && (
        <div className={s.modal}>
          <div className={s.modalInner}>
            <h2>Update Task</h2>
            <input
              className={s.modalInput}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New task"
            />
            <button onClick={handleUpdateTask} className={s.updateButton}>
              Update
            </button>
            <button onClick={closeModal} className={s.updateButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
