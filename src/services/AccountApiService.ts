import axios from "axios";
import Account from "../models/Account";

//* stores base URL
const baseUrl: string = process.env.REACT_APP_API_BASE_URL || "";

//* retrieves all user account data from the database
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

//* retrieves a specific users account data from the database
export const getUserData = (uid: string): Promise<Account> => {
  return axios
    .get(`${baseUrl}/typer/user/${uid}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//* creates a new account for a user in the database
export const createNewAccount = (account: Account): Promise<Account> => {
  return axios
    .post(`${baseUrl}/typer/addAccount`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

//* updates the details of a users account in the database
export const updateAccountDetails = (account: Account): Promise<Account> => {
  return axios
    .put(`${baseUrl}/typer/${account._id}`, account)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
