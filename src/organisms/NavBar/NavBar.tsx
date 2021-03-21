import React, { useState, useEffect, useRef } from "react";
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

function NavBar() {
  const [authToken, setAuthToken] = useLocalStorage("authToken");
  const { setHeader } = useSetAuthHeader();
  const [showMenu, setShowMenu] = useState(false);
  const menuItemRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
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
    history.push("/profile");
  };

  if (!authToken && !data?.success) {
    return (
      <header className={styles.navBar}>
        <div className={styles.btnContainer}>
          <Link to="/queries">
            <span>Queries</span>
          </Link>
          <Link to="/post">
            <span>Post Query</span>
          </Link>

          <span className={styles.signInBtn} onClick={openLoginUpModal}>
            Sign In
          </span>
        </div>
        <SignUpModal
          isModalOpen={isSignUpModalOpen}
          closeModal={closeSignUpModal}
          openLogin={openLoginUpModal}
          openVerify={openVerifyModal}
        />
        <LoginModal
          isModalOpen={isLoginModalOpen}
          closeModal={closeLoginUpModal}
          openSignUp={openSignUpModal}
        />
        <VerifyModal
          isModalOpen={isVerifyModalOpen}
          closeModal={closeVerifyModal}
          openVerify={openVerifyModal}
        />
      </header>
    );
  } else {
    return (
      <header className={styles.navBar}>
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
            <span onClick={onSignOut}>SignOut</span>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
