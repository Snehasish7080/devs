import { useEffect, useState } from "react";
import useLocalStorage from "react-use-localstorage";

function useIsLogin() {
  const [authToken, setAuthToken] = useLocalStorage("authToken");

  return {
    authToken,
  };
}

export default useIsLogin;
