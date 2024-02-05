import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserModifyPage: NextPage = () => {
  const [form, setForm] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  const router = useRouter();

  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/codeTestUser");
        const usersData = await response.json();

        if (Array.isArray(usersData)) {
          setAllUsers(usersData);
        } else {
          console.error("Data from API is not an array:", usersData);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = () => {
    router.push("/codeTestCreateUser");
  };

  const handleModify = (userId: number) => {
    router.push(`/codeTestUser/modify/${userId}`);
  };

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>Users :</h2>
      <a>bouton →</a>
      <button className="create-button" onClick={handleCreate}>
        Create
      </button>
      <ul style={listStyles}>
        {allUsers.map((user) => (
          <li key={user.id} style={listItemStyles}>
            <p style={userStyles}>ID: {user.id}</p>
            <p style={userStyles}>Name: {user.name}</p>
            <p style={userStyles}>Email: {user.email}</p>
            <button type="submit" className="modify-button" onClick={() => handleModify(user.id)}>
              Modify
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const listStyles = {
  listStyle: "none",
  padding: 0,
};

const listItemStyles = {
  borderBottom: "1px solid #ccc",
  marginBottom: "10px",
  padding: "10px",
};

const userStyles = {
  margin: 0,
};

export default UserModifyPage;
