import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  signInWithGoogle,
  signInWithGoogleRedirect,
  signOut,
} from "../firebaseConfig";
import "./Header.css";
import { checkForMobile } from "./utils/functions";

const mobile: boolean = checkForMobile();

console.log(mobile);
const Header = () => {
  const { user, account } = useContext(AuthContext);

  return (
    <header className="Header">
      {user && account ? (
        <div>
          <Link to={`/account-details/${account!.uid}`}>
            <img src={user.photoURL!} alt={user.displayName!} />
          </Link>
          <button onClick={signOut}>Sign Out</button>
          <nav>
            <ul>
              <Link to="/typing-page">
                <li>Move to typing page</li>
              </Link>
            </ul>
          </nav>
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
