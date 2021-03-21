import { useEffect, useState } from "react";
import useLocalStorage from "react-use-localstorage";
import client from "../api/Client";
import useIsLogin from "./useIsLogin";

function useSetAuthHeader() {
  // const [authToken, setAuthToken] = useLocalStorage("authToken");
  const { authToken } = useIsLogin();
  const setHeader = () => {
    client.setHeader("Authorization", authToken);
  };

  return {
    setHeader,
  };
}

export default useSetAuthHeader;
