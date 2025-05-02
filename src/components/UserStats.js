import React from "react";
import { useUserContext } from "../context/UserContext";

function UserStats() {
  const { selectedUser } = useUserContext();

  if (!selectedUser) return null;

  const total = selectedUser.tasks.length;
  const completadas = selectedUser.tasks.filter((t) => t.completed).length;

  return (
    <>
      <p id="userName">{selectedUser.name}</p>
      <p id="userStats">Tareas: {completadas} / {total} completadas</p>
    </>
  );
}

export default UserStats;
