import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Logo from "../assets/celestial-typer-logo.png";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import { checkForMobile } from "./utils/functions";

const mobile: boolean = checkForMobile();

console.log(mobile);
const Header = () => {
  const { user, account } = useContext(AuthContext);

  return (
    <header className="Header">
      <img src={Logo} alt="Celstial Typer" width="250px" />
      {user && account ? (
        <div>
          <nav>
            <ul>
              <Link to="/typing-page">
                <li>Typing Page</li>
              </Link>
              <Link to="/leaderboard">
                <li>Leaderboard</li>
              </Link>
            </ul>
          </nav>
          <Link to={`/account-details/${account!.uid}`}>
            <img
              src={user.photoURL!}
              alt={user.displayName!}
              className="user-image"
            />
          </Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        // ) : mobile ? (
        // <button onClick={() => signInWithGoogleRedirect}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
