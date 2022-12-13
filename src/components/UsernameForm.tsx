import { FormEvent, useState } from "react";
import "./UsernameForm.css";
import Logo from "./Logo";

interface Props {
  newAccountName: (username: string) => void;
}

//* React component which is used to create a new user account
const UsernameForm = ({ newAccountName }: Props) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  //* when user submits the UsernameForm, this function is called to check if the username is valid (through character params)
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    //* between 5-15 characters, no special characters
    //* good
    if (
      username.length >= 5 &&
      username.length <= 12 &&
      !username.includes(".") &&
      !username.includes("&") &&
      !username.includes("=") &&
      !username.includes("_") &&
      !username.includes("'") &&
      !username.includes("+") &&
      !username.includes(",")
    ) {
      newAccountName(username);
    } //! NOT good
    else if (username.length >= 5 && username.length <= 12) {
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
      setError("Username must be at least 5 characters and not more than 12");
    } else {
      setError(
        "Username must be at least 5 characters and not more than 12 and cannot contain special characters"
      );
    }
  };

  return (
    <form className="UsernameForm" onSubmit={submitHandler}>
      <div className="input-button">
        <Logo className={"submit"} />
        <label htmlFor="username">Set Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type Username Here"
        />
        <div className="error-message">{error}</div>
        <button className="submit-button">
          <strong>Submit</strong>
        </button>
      </div>
    </form>
  );
};

export default UsernameForm;
