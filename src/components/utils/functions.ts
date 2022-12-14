import Account from "../../models/Account";
import Article from "../../models/Article";

//* returns a boolean based on if device has a touch screen or not (if there is a touchscreen, return true. If it does not, return false).
export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 1;
};

//* Pulls a quantity of random articles from API Endpoint.
export const randomArticles = (
  articles: Article[],
  quantity: number
): Article[] => {
  let numOfArticles: Article[] = [];
  //* loops a number of times equal to the quantity provided
  for (let i = 0; i < quantity; i++) {
    let randomIndex: number = Math.floor(Math.random() * articles.length);
    //* checks to see if random article already exists in the array to prevent duplicates
    let foundIndex: number = numOfArticles.findIndex((article) => {
      return article.id === articles[randomIndex].id;
    });
    if (foundIndex === -1) {
      //* if the findIndex method finds no matches, push the article to the array
      numOfArticles.push(articles[randomIndex]);
    } else {
      //* if there is a matching article in the array, then loop again
      i--;
    }
  }
  return numOfArticles;
};

export const sortScores = (array: Account[]) => {
  if (array[0]) {
    array.sort((a, b) => {
      const scoreA = a.scores[a.scores.length - 1].adjustedCharactersPerMinute;
      const scoreB = b.scores[b.scores.length - 1].adjustedCharactersPerMinute;
      if (scoreA > scoreB) {
        return -1;
      }
      if (scoreA < scoreB) {
        return 1;
      }
      return 0;
    });
  }
};

export const shortenTitles = (
  articles: Article[],
  checkForMobile: boolean
): Article[] => {
  if (checkForMobile) {
    const shortTitles: Article[] = [];
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].title.length > 45) {
        shortTitles.push(articles[i]);
        shortTitles[i].title = `${shortTitles[i].title.slice(0, 45)}...`;
        if (
          shortTitles[i].title[shortTitles[i].title.length - 4] === " " ||
          shortTitles[i].title[shortTitles[i].title.length - 4] === "," ||
          shortTitles[i].title[shortTitles[i].title.length - 4] === "."
        ) {
          shortTitles[i].title = `${shortTitles[i].title.slice(0, 44)}...`;
        }
      } else {
        shortTitles.push(articles[i]);
      }
    }
    return shortTitles;
  } else {
    return articles;
  }
};
