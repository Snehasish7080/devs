import React, { useState, useEffect, useRef, createContext } from "react";
import styles from "./NavBar.module.scss";
import defaultUserImg from "../../assets/images/defaultUserImg.svg";
import Image from "../../atoms/Image/Image";
import Button from "../../atoms/Button/Button";
import SignUpModal from "../SignUpModal/SignUpModal";
import useModal from "../../hooks/useModal";
import LoginModal from "../LoginModal/LoginModal";
import { useHistory, Link } from "react-router-dom";
import VerifyModal from "../VerifyModal/VerifyModal";
import { Avatar } from "../../atoms/Avatar/Avatar";
import useLocalStorage from "react-use-localstorage";
import useSetAuthHeader from "../../hooks/useSetAuthHeader";
import { IUser } from "../../Interface/User";
import useIsLogin from "../../hooks/useIsLogin";
import Loader from "../../atoms/Loader/Loader";
// import useOutsideClick from "../../hooks/useOutsideClick";

interface State {
  email: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState: State = {
  email: "",
};

export const NavContext = createContext<State>(defaultState);

type UserData = {
  data: IUser;
  message: string;
  status: boolean;
};

function NavBar() {
  const [authToken, setAuthToken] = useLocalStorage("authToken");
  const { setHeader } = useSetAuthHeader();
  const [showMenu, setShowMenu] = useState(false);
  const menuItemRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState<string>("");
  const state: State = {
    email: userEmail,
    setEmail: setUserEmail,
  };
  const {
    isSignUpModalOpen,
    closeSignUpModal,
    openSignUpModal,
    isLoginModalOpen,
    closeLoginUpModal,
    openLoginUpModal,
    isVerifyModalOpen,
    openVerifyModal,
    closeVerifyModal,
  } = useModal();

  setHeader();
  const { User, UserRefetch } = useIsLogin();

  useEffect(() => {
    if (authToken) {
      UserRefetch();
    }
  }, [authToken, UserRefetch, User?.data]);

  const onSignOut = () => {
    setAuthToken("");
    setShowMenu(false);
    history.replace("/");
  };

  const onClickProfile = () => {
    setShowMenu(false);
    history.push(`/user/${User?.data?.username}`);
  };
  const onClickSettings = () => {
    setShowMenu(false);
    history.push("/settings");
  };
  const onClickReports = () => {
    setShowMenu(false);
    history.push("/reports");
  };

  if (authToken) {
    if (User?.data._id) {
      return (
        <header className={styles.navBar}>
          <Link to={"/queries"}>
            <div className={styles.iconTile}>D̶͔̭̪̻ẹ̿͋̒̕v͒̄ͭ̏̇s̠҉͍͊ͅ</div>
          </Link>
          <div className={styles.btnContainer}>
            <Link to="/queries">
              <span>Queries</span>
            </Link>
            <Link to="/post">
              <span>Post Query</span>
            </Link>
            <div
              className={styles.menuContainer}
              onClick={() => setShowMenu(!showMenu)}
            >
              <Avatar className={styles.avatar} />
            </div>
            <div
              className={`${styles.menuItemContainer} ${
                showMenu && styles.showMenu
              }`}
              ref={menuItemRef}
            >
              <span onClick={onClickProfile}>{User?.data?.username}</span>
              <span onClick={onClickReports}>Reports</span>
              <span onClick={onClickSettings}>Settings</span>
              <span onClick={onSignOut}>SignOut</span>
            </div>
          </div>
        </header>
      );
    } else {
      return <Loader />;
    }
  } else {
    return (
      <header className={styles.navBar}>
        <Link to={"/"}>
          <div className={styles.iconTile}>D̶͔̭̪̻ẹ̿͋̒̕v͒̄ͭ̏̇s̠҉͍͊ͅ</div>
        </Link>

        <div className={styles.btnContainer}>
          <Link to="/queries">
            <span>Queries</span>
          </Link>

          <span className={styles.signInBtn} onClick={openLoginUpModal}>
            Sign In
          </span>
        </div>
        <LoginModal
          isModalOpen={isLoginModalOpen}
          closeModal={closeLoginUpModal}
          openSignUp={openSignUpModal}
        />
        <NavContext.Provider value={state}>
          <SignUpModal
            isModalOpen={isSignUpModalOpen}
            closeModal={closeSignUpModal}
            openLogin={openLoginUpModal}
            openVerify={openVerifyModal}
          />
          <VerifyModal
            isModalOpen={isVerifyModalOpen}
            closeModal={closeVerifyModal}
            openVerify={openVerifyModal}
          />
        </NavContext.Provider>
      </header>
    );
  }
}

export default NavBar;
