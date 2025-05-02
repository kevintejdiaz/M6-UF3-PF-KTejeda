import React from "react";
import { useUserContext } from "../context/UserContext";

function TaskList() {
  const { selectedUser, updateUserTasks } = useUserContext();

  if (!selectedUser) return <p>Selecciona un usuario para ver las tareas.</p>;

  const toggleTask = (index) => {
    const updated = [...selectedUser.tasks];
    updated[index].completed = !updated[index].completed;
    updateUserTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...selectedUser.tasks];
    updated.splice(index, 1);
    updateUserTasks(updated);
  };

  const editTask = (index) => {
    const newText = prompt("Editar tarea:", selectedUser.tasks[index].text);
    if (newText && newText.trim() !== "") {
      const updated = [...selectedUser.tasks];
      updated[index].text = newText.trim();
      updateUserTasks(updated);
    }
  };

  return (
    <ul id="taskList">
      {selectedUser.tasks.map((task, index) => (
        <li key={index} className={task.completed ? "completed" : ""}>
          <span onClick={() => toggleTask(index)}>{task.text}</span>
          <div className="actions">
            <button onClick={() => editTask(index)}>✏️</button>
            <button onClick={() => deleteTask(index)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
