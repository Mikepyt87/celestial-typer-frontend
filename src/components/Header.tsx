import LogoImg from "../assets/celestial-typer-logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import "./Header.css";
import { checkForMobile } from "./utils/functions";
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
      <Logo />
      {user && account ? (
        <div>
          <nav>
            <ul>
              <Link to="/typing-page">
                <li>Typing Page</li>
              </Link>
              {width > 600 && (
                <li className="leaderboard">
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
              )}
            </ul>
          </nav>
          {/* <Link to={`/account-details/${account!.uid}`}> */}
          <img
            src={user.photoURL!}
            alt={user.displayName!}
            className="user-image"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
          {/* </Link> */}
          <AccountMenu toggleMenu={toggleMenu} />
          {toggleMenu && (
            <div
              className="invisible-wall"
              onClick={() => {
                setToggleMenu(false);
              }}
            ></div>
          )}
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
