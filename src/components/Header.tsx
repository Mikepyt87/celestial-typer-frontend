import LogoImg from "../assets/celestial-typer-logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import "./Header.css";
import Logo from "./Logo";
import AccountMenu from "./AccountMenu";
import useWindowDimensions from "./custom hooks/useWindowDimensions";

const Header = () => {
  const { user, account } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const { width } = useWindowDimensions();

  return (
    <header className={`Header logged-out-${!user && !account}`}>
      {/* <img src={LogoImg} alt="Celstial Typer" width="250px" /> */}
      <Logo className={"header"} />
      {user && account ? (
        <div>
          <nav>
            <ul>
              <Link to="/typing-page">
                <li>Typing Page</li>
              </Link>
              {width > 600 && (
                <Link to="/leaderboard">
                  <li className="leaderboard">Leaderboard</li>
                </Link>
              )}
            </ul>
          </nav>
          <img
            src={user.photoURL!}
            alt={user.displayName!}
            className="user-image"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
          <AccountMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </header>
  );
};

export default Header;
