import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Article from "../models/Article";
import { getAllArticles } from "../services/spaceFlightApiService";
import "./Home.css";
import replacementImg from "../assets/nasa_logo.jpg";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import UsernameForm from "./UsernameForm";

// returns 10 random articles
// input is the response from the Space Flight Api endpoint
const tenRandomArticles = (articles: Article[]): Article[] => {
  let randomArticles: Article[] = [];
  // loops 10 times
  for (let i = 0; i < 10; i++) {
    let randomIndex: number = Math.floor(Math.random() * articles.length);
    // check to see if tenRandomArticles array already contains the next selected object
    let foundIndex: number = randomArticles.findIndex((article) => {
      return article.id === articles[randomIndex].id;
    });
    if (foundIndex === -1) {
      // if the findIndex method does not return anything, add the object to tenRandomArticles array
      randomArticles.push(articles[randomIndex]);
    } else {
      // if there is a matching object in the array, then loop again
      i--;
    }
  }
  return randomArticles;
};

const Home = () => {
  const { user, account } = useContext(AuthContext);

  // useState that holds an array of ten randomized objects from Space Flight Api endpoint
  const [articles, setArticles] = useState<Article[]>();
  // console.log(articles);

  useEffect(() => {
    // calls Space Flight Api service function
    getAllArticles().then((res) => {
      // sets articles to ten random objects
      setArticles(tenRandomArticles(res));
    });

    // getUserData().then((res) => {
    //   console.log(res);
    // });
  }, []);

  const insertAccountname = (username: string) => {
    console.log(username);
  };

  // once articles load, page is rendered
  if (articles) {
    return (
      <div className="Home">
        {user ? (
          <div>
            <p>{user.displayName}</p>
            <button onClick={signOut}>Sign Out</button>
            <Link to="/typing-page">
              <button>Move to typing page</button>
            </Link>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>Sign In</button>
        )}
        {account?.initalSetUp && (
          <UsernameForm newAccountName={insertAccountname} />
        )}
        <div>
          {/* if articles array is not empty, map the objects to the page */}
          {articles.length > 0 &&
            articles.map((article) => (
              <div key={`${article.id}_${article.publishedAt}`}>
                {/* renders title and image from each object */}
                <p>{article.title}</p>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  // if image is not found, then load replacementImg
                  onError={({ currentTarget }) => {
                    currentTarget.src = replacementImg;
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    );
    // while waiting, page renders loading div
    // class can be altered in index.css
  } else {
    return <div className="loading">loading...</div>;
  }
};

export default Home;
