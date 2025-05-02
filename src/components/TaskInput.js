import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";

function TaskInput() {
  const [newTask, setNewTask] = useState("");
  const { selectedUser, updateUserTasks } = useUserContext();

  if (!selectedUser) return null;

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updated = [...selectedUser.tasks, { text: newTask.trim(), completed: false }];
      updateUserTasks(updated);
      setNewTask("");
    }
  };

  return (
    <>
      <input
        type="text"
        id="newTaskInput"
        placeholder="Nueva tarea..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Añadir Tarea</button>
    </>
  );
}

export default TaskInput;
