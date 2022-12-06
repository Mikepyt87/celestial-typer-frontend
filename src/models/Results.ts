import Article from "./Article";

export default interface Results {
  errors: number;
  total: number;
  article: Article[];
}
