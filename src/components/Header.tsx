import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  const { user, account } = useContext(AuthContext);

  return (
    <div className="Header">
      {user ? (
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
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </div>
  );
};

export default Header;
