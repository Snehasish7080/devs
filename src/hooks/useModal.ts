import { useState } from "react";

function useModal() {
  // SignUpMOdal
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    closeLoginUpModal();
  };
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  //LoginModal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginUpModal = () => {
    setIsLoginModalOpen(true);
    closeSignUpModal();
  };

  const closeLoginUpModal = () => {
    setIsLoginModalOpen(false);
  };

  // VerifyModal

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const openVerifyModal = () => {
    setIsVerifyModalOpen(true);
  };

  const closeVerifyModal = () => {
    setIsVerifyModalOpen(false);
  };

  return {
    isSignUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
    isLoginModalOpen,
    openLoginUpModal,
    closeLoginUpModal,
    isVerifyModalOpen,
    openVerifyModal,
    closeVerifyModal,
  };
}

export default useModal;
