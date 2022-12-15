import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import "./Header.css";
import Logo from "./Logo";
import AccountMenu from "./AccountMenu";
import useWindowDimensions from "./custom hooks/useWindowDimensions";
import { motion } from "framer-motion";

const Header = () => {
  //* access info about current user: photo URL and display name
  const { user, account } = useContext(AuthContext);

  const [toggleMenu, setToggleMenu] = useState(false);

  const { width } = useWindowDimensions();

  const initial = { opacity: 0 };

  const animate = { opacity: 1 };

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
        <div className="sign-in-container">
          <motion.p
            className="keep-track"
            initial={initial}
            animate={animate}
            transition={{ duration: 3 }}
          >
            Keep track of your scores <span className="arrow">→</span>{" "}
          </motion.p>
          <button onClick={signInWithGoogle} className="sign-in-button">
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
