import axios from "axios";
import Article from "../models/Article";

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
