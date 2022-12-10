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
import { motion } from "framer-motion";

const Header = () => {
  const { user, account } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(false);

  const { width } = useWindowDimensions();

  return (
    <header className={`Header logged-out-${!user && !account}`}>
      {/* <img src={LogoImg} alt="Celstial Typer" width="250px" /> */}
      <Logo className={"logo"} />
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
          <img
            src={user.photoURL!}
            alt={user.displayName!}
            className="user-image"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
          <AccountMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
          {toggleMenu && (
            <motion.div
              animate={{ backgroundColor: "rgb(26 35 61)", opacity: 0.5 }}
              transition={{ duration: 0.25 }}
              className="invisible-wall"
              onClick={() => {
                setToggleMenu(false);
              }}
            >
              {/* <input type="color" /> */}
            </motion.div>
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
