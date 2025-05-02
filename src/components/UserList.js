import React from "react";
import { useUserContext } from "../context/UserContext";

function UserList() {
  const { users, selectedUserIndex, selectUser } = useUserContext();

  if (users.length === 0) {
    return <p>No hay usuarios aún.</p>;
  }

  return (
    <ul id="userList">
      {users.map((user, index) => (
        <li
          key={index}
          onClick={() => selectUser(index)}
          style={{ cursor: "pointer", fontWeight: selectedUserIndex === index ? "bold" : "normal" }}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
