import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import React, { useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
  name: string;
}

const Home: NextPage = () => {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  // Fonction asynchrone pour envoyer les données au serveur
  async function create(data: FormData) {
    try {
      // Utilisation de la fonction fetch pour effectuer une requête POST
      const response = await fetch("http://localhost:3000/api/codeTestCreateUser", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      // Vérification de la réponse HTTP
      if (response.ok) {
        // Récupération des données JSON de la réponse
        const result = await response.json();
        console.log("User created:", result.user);

        // Réinitialisation du formulaire après la création de l'utilisateur
        setForm({ username: "", email: "", password: "", name: "" });
      } else {
        console.log("Error creating user");
      }
    } catch (error) {
      console.error("Failure:", error);
    }
  }

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    // Empêche le comportement par défaut du formulaire (rechargement de la page)
    e.preventDefault();

    // Appel de la fonction create pour envoyer les données au serveur
    try {
      await create(form);
      alert(`Utilisateur créé avec succès : ${JSON.stringify(form)}`);
    } catch (error) {
      console.log("Failure:", error);
    }
  };

  const router = useRouter();

  const handleReturn = () => {
    // Utilisez le router pour naviguer vers la page codeTestCreateUser
    router.push("/codeTestUser");
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={form.email}
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <a>bouton →</a>
        <button type="submit">Create User</button>
        <br />
        <a>bouton →</a>
        <button className="return-button" onClick={handleReturn}>
          Retour
        </button>
      </form>
    </div>
  );
};

export default Home;
