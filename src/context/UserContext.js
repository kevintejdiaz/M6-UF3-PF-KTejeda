import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const addUser = (name) => {
    if (name.trim() === "") return;
    setUsers((prev) => [...prev, { name: name.trim(), tasks: [] }]);
  };

  const selectUser = (index) => setSelectedUserIndex(index);
  const deselectUser = () => setSelectedUserIndex(null);

  const updateUserTasks = (tasks) => {
    setUsers((prev) => {
      const updated = [...prev];
      updated[selectedUserIndex].tasks = tasks;
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUserIndex,
        selectedUser: selectedUserIndex !== null ? users[selectedUserIndex] : null,
        addUser,
        selectUser,
        deselectUser,
        updateUserTasks,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
