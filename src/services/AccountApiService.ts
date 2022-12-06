import axios from "axios";
import Account from "../models/Account";

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || "";

export const getallUsers = (): Promise<Account[]> => {
  return axios
    .get(`${baseUrl}/typer/`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUserData = (id: string): Promise<Account> => {
  return (
    axios
      // TODO
      .get(`${baseUrl}/typer/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
};
