import axios from "axios";
import Account from "../models/Account";

const baseUrl: string = process.env.REACT_APP_API_BASE_URL || "";

export const getallUsersScores = (): Promise<Account[]> => {
  return axios
    .get(`${baseUrl}/typer`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//make an account !! set up a function to make an accound

//call getuser data

//if not call this function getUSerdatae
//It will hit out post method

export const getUserData = (uid: string): Promise<Account> => {
  return axios
    .get(`${baseUrl}/typer/${uid}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const createNewAccount = (account: Account): Promise<Account> => {
  return axios
    .post(`${baseUrl}/typer/addAccount`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const updateAccountDetails = (account: Account): Promise<Account> => {
  return axios
    .put(`${baseUrl}/typer/${account._id}`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
