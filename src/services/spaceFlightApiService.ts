import axios from "axios";
import Article from "../models/Article";

//* retrieves all articles from a remote database
export const getAllArticles = (): Promise<Article[]> => {
  return (
    axios
      //? Space Flight Api endpoint
      .get(
        "https://api.spaceflightnewsapi.net/v3/articles?url_contains=nasa&_limit=200"
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
};

export const getSpecificArticle = (id: number): Promise<Article[]> => {
  return (
    axios
      //? Space Flight Api endpoint
      .get(
        `https://api.spaceflightnewsapi.net/v3/articles?id_contains=${id}&_limit=1`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err))
  );
};
