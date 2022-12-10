import "./AccountMenu.css";
import { motion } from "framer-motion";
import { signOut } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useWindowDimensions from "./custom hooks/useWindowDimensions";

interface Props {
  toggleMenu: boolean;
  setToggleMenu: (toggle: boolean) => void;
}

const AccountMenu = ({ toggleMenu, setToggleMenu }: Props) => {
  const { account } = useContext(AuthContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    window.addEventListener("scroll", () => setToggleMenu(false));
  });

  return (
    <motion.nav
      className="AccountMenu"
      animate={{
        height: toggleMenu ? "100px" : "0px",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <ul>
        {width < 600 && (
          <li className="leaderboard">
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        )}
        <li>
          <Link to={`/account-details/${account!.uid}`}>Account Details</Link>
        </li>
        <button
          className="sign-out-button"
          onClick={() => {
            signOut();
            setToggleMenu(!toggleMenu);
          }}
        >
          Sign Out
        </button>
      </ul>
    </motion.nav>
  );
};

export default AccountMenu;
