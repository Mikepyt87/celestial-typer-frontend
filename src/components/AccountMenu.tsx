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

//* functional React component used to display a menu for the logged in user
const AccountMenu = ({ toggleMenu, setToggleMenu }: Props) => {
  //* access 'account' object from the 'AuthContext' object
  const { account } = useContext(AuthContext);
  //* reads the users window width
  const { width } = useWindowDimensions();

  //* hook to add an event listener to set toggleMenu state to false when the user scrolls. (hides menu when scrolling)
  useEffect(() => {
    window.addEventListener("scroll", () => setToggleMenu(false));
  });

  return (
    <>
      {/* //* animates menu height based off the 'toggleMenu' prop */}
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
          <Link to={`/account-details/${account!.uid}`}>
            <li className="account-details">Account Details</li>
          </Link>
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
      {toggleMenu && (
        <motion.div
          animate={{ backgroundColor: "rgb(26 35 61)", opacity: 0.5 }}
          transition={{ duration: 0.25 }}
          className="invisible-wall"
          onClick={() => {
            setToggleMenu(false);
          }}
        ></motion.div>
      )}
    </>
  );
};

export default AccountMenu;
