import React, { useState } from "react";

export default function SignUpForm({ setToken }) {
 const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

async function handleSubmit(e) {
  e.preventDefault();
  if (username.length === 8) {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: `${username}`,
            password: `${password}`,
          }),
        }
      );
      const result = await response.json();
      onSetToken(result.token);

      if (result.success) setSuccessfulSignUp(result.message);

      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  } else {
    setSuccessfulSignUp("Username must be 10 characters long to submit.");
  }
}
return (
  <div className="form section">
    <h2>Sign Up!</h2>
    {error && <p>{error}</p>}
    <form method="POST" onSubmit={handleSubmit}>
      <label>
        Username:{" "}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Password:{" "}
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button className="button">Submit</button>
    </form>
    {username && (
      <p>
        {username.length < 10
          ? `Username must be 10 characters long. You have ${
              10 - username.length
            } characters remaining`
          : username.length > 10
          ? `Username is too long, remove ${username.length - 10} characters.`
          : "Username is good to go."}
      </p>
    )}
    {successfulSignUp && (
      <h3>
        {successfulSignUp} {username.length === 8 ? username : ""}
      </h3>
    )}
  </div>
);
    }
