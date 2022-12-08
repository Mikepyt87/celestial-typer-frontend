import { FormEvent, useState } from "react";
import "./UsernameForm.css";

interface Props {
  newAccountName: (username: string) => void;
}

const UsernameForm = ({ newAccountName }: Props) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      username.length >= 5 &&
      username.length <= 15 &&
      !username.includes(".") &&
      !username.includes("&") &&
      !username.includes("=") &&
      !username.includes("_") &&
      !username.includes("'") &&
      !username.includes("+") &&
      !username.includes(",")
    ) {
      newAccountName(username);
    } else if (username.length >= 5 && username.length <= 15) {
      setError("Username cannot contain special characters");
    } else if (
      !username.includes(".") &&
      !username.includes("&") &&
      !username.includes("=") &&
      !username.includes("_") &&
      !username.includes("'") &&
      !username.includes("+") &&
      !username.includes(",")
    ) {
      setError("Username must be at least 5 characters and not more than 15");
    } else {
      setError(
        "Username must be at least 5 characters and not more than 15 and cannot contain special characters"
      );
    }
  };

  return (
    <form className="UsernameForm" onSubmit={submitHandler}>
      <div className="input-button">
        <label htmlFor="username">Set Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="type Username Here"
        />
        <div className="error-message">{error}</div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default UsernameForm;
