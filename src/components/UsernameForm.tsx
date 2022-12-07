import { FormEvent, useState } from "react";
import "./UsernameForm.css";

interface Props {
  newAccountName: (username: string) => void;
}

const UsernameForm = ({ newAccountName }: Props) => {
  const [username, setUsername] = useState("");

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
    }
  };

  return (
    <form className="UsernameForm" onSubmit={submitHandler}>
      <label htmlFor="username">Set Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="type Username Here"
      />
      <button>Submit</button>
    </form>
  );
};

export default UsernameForm;
