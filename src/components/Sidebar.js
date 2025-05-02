import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useThemeContext } from "../context/ThemeContext";
import UserList from "./UserList";
import UserStats from "./UserStats";

function Sidebar() {
  const [newUser, setNewUser] = useState("");
  const { addUser, selectedUser, deselectUser } = useUserContext();
  const { toggleTheme } = useThemeContext();

  const handleAddUser = () => {
    if (newUser.trim() !== "") {
      addUser(newUser);
      setNewUser("");
    }
  };

  return (
    <aside className="sidebar card">
      <h2>Usuarios</h2>

      <UserList />

      <input
        type="text"
        id="newUserInput"
        placeholder="Nuevo usuario..."
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={handleAddUser}>Añadir Usuario</button>

      {selectedUser && (
        <div id="userInfo">
          <hr />
          <UserStats />
          <button onClick={deselectUser}>Deseleccionar</button>
        </div>
      )}

      <button id="themeToggleBtn" onClick={toggleTheme}>🌙/☀️ Tema</button>
    </aside>
  );
}

export default Sidebar;
