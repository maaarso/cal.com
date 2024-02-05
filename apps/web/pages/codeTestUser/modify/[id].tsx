import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  username: string;
  isUserInput: boolean;
}

const UserModifyPage: NextPage = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    email: "",
    password: "",
    name: "",
    username: "",
    isUserInput: false,
  });

  const router = useRouter();
  const { id } = router.query as unknown as { id: number };

  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDeleteClick = () => {
    setDeleteClicked(true);
  };

  // Function to fetch user details from the server
  async function searchUser(id: number) {
    try {
      const response = await fetch("http://localhost:3000/api/getUserById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User selected:", result.user);
        setUser(result.user);
      } else {
        console.log("Error selecting user");
      }
    } catch (error) {
      console.error("Failure:", error);
    }
  }

  // Function to send data to the server for user update
  async function update(data: User) {
    try {
      const response = await fetch("http://localhost:3000/api/codeTestUpdateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User updated:", result.user);

        // Reset the form after updating the user
        setUser({
          id: 0,
          email: "",
          password: "",
          name: "",
          username: "",
          isUserInput: false,
        });
      } else {
        console.log("Error updating user");
      }
    } catch (error) {
      console.error("Failure:", error);
    }
  }

  // Function to send data to the server for user deletion
  async function deleteUser(id: number) {
    try {
      const response = await fetch("http://localhost:3000/api/codeTestDeleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User deleted:", result.user);
        setUser(result.user);
      } else {
        console.log("Error deleting user");
      }
    } catch (error) {
      console.error("Failure:", error);
    }
  }

  useEffect(() => {
    if (id) {
      searchUser(id);
    }
  }, [id]);

  const handleReturn = () => {
    router.push("/codeTestUser");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value, isUserInput: true }));
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await update(user);
    } catch (error) {
      console.log("Failure:", error);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.log("Failure:", error);
      }
    }
  };

  return (
    <div>
      <h1>Modify User {id}</h1>
      {/* Display user details and form */}
      <div style={listItemStyles}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            required
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          <button type="submit">Update User</button>
          <br />
          <button className="return-button" onClick={handleReturn}>
            Retour
          </button>
          <br />
          <button className="DeleteUser" onClick={handleDelete}>
            Delete User
          </button>
        </form>
      </div>
    </div>
  );
};

const listItemStyles = {
  borderBottom: "1px solid #ccc",
  marginBottom: "10px",
  padding: "10px",
};

export default UserModifyPage;
