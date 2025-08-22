import React, { useState, useCallback } from "react";
import AddEdit from "./AddEdit";

const Task = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setEditingTask(null); // New task
    setShowForm(true);
  };

  const handleFormSubmit = useCallback((task) => {
    setAllTasks(prev => {
      if (editingTask != null) {
        // Replace edited task
        return prev.map((t, i) => (i === editingTask ? task : t));
      }
      return [...prev, task]; // Add new task
    });
    setShowForm(false);
  }, [editingTask]);

  const handleEdit = useCallback((index) => {
    setEditingTask(index);
    setShowForm(true);
  }, []);

  return (
    <>
      <button onClick={handleAddClick}>Add Task</button>
      {showForm && (
        <AddEdit
          onSubmit={handleFormSubmit}
          taskData={editingTask != null ? allTasks[editingTask] : null}
        />
      )}
      <ul>
        {allTasks.map((item, index) => (
          <li key={index}>
            <strong>{item.title}</strong> — {item.description} [{item.status}] <br/>
            <small>Created: {new Date(item.createdAt).toLocaleString()}</small>{" "}
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Task;
