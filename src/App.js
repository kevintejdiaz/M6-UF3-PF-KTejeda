import React from "react";
import { useUserContext } from "./context/UserContext";
import { useThemeContext } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";

function App() {
  const { theme } = useThemeContext();
  const { selectedUser } = useUserContext();

  return (
    <div className={`app ${theme}`}>
      <Sidebar />
      <main className="main">
        <div className="card">
          <h1 id="mainTitle">
            {selectedUser ? `Tareas de ${selectedUser.name}` : "Selecciona un usuario"}
          </h1>
          {selectedUser && (
            <div id="taskSection">
              <TaskList />
              <TaskInput />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
