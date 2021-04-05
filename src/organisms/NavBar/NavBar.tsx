import React, { useState, useEffect, useRef, createContext } from "react";
import { useQuery } from "react-query";
import styles from "./NavBar.module.scss";
import defaultUserImg from "../../assets/images/defaultUserImg.svg";
import Image from "../../atoms/Image/Image";
import Button from "../../atoms/Button/Button";
import SignUpModal from "../SignUpModal/SignUpModal";
import useModal from "../../hooks/useModal";
import LoginModal from "../LoginModal/LoginModal";
import { useHistory, Link } from "react-router-dom";
import VerifyModal from "../VerifyModal/VerifyModal";
import { user } from "../../api/User";
import { ApiResponse } from "apisauce";
import { Avatar } from "../../atoms/Avatar/Avatar";
import useLocalStorage from "react-use-localstorage";
import useSetAuthHeader from "../../hooks/useSetAuthHeader";
// import useOutsideClick from "../../hooks/useOutsideClick";

interface State {
  email: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState: State = {
  email: "",
};

export const NavContext = createContext<State>(defaultState);

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

  const getUser = async () => {
    const response: ApiResponse<any, any> = await user();
    return response.data;
  };
  setHeader();
  const { isLoading, error, data, refetch } = useQuery("user", getUser, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (authToken) {
      refetch();
    }
  }, [authToken]);

  // useOutsideClick<HTMLDivElement>(menuItemRef, (isOutSide) => {
  //   if (isOutSide) {
  //     setShowMenu(false);
  //   }
  // });

  const onSignOut = () => {
    setShowMenu(false);
    setAuthToken("");
  };

  const onClickProfile = () => {
    setShowMenu(false);
    history.push("/profile/");
  };
  const onClickSettings = () => {
    setShowMenu(false);
    history.push("/settings");
  };

  if (!authToken && !data?.success) {
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
            <span onClick={onClickProfile}>Profile</span>
            <span onClick={onClickSettings}>Settings</span>
            <span onClick={onSignOut}>SignOut</span>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
