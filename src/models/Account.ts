import Article from "./Article";
import Score from "./Score";

export default interface Account {
  _id?: string;
  profilePic: string;
  userName: string;
  scores: Score[];
  favoritedArticles: Article[];
}
