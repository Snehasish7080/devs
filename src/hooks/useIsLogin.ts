import { ApiResponse } from "apisauce";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useLocalStorage from "react-use-localstorage";
import { user } from "../api/User";
import { IUser } from "../Interface/User";
import useSetAuthHeader from "./useSetAuthHeader";

type UserData = {
  data: IUser;
};
function useIsLogin() {
  const [authToken, setAuthToken] = useLocalStorage("authToken");

  const getUser = async () => {
    const response: ApiResponse<any, any> = await user();
    return response.data;
  };
  const { data: User, refetch: UserRefetch } = useQuery<UserData>(
    "user",
    getUser,
    { cacheTime: 0 }
  );

  return {
    User,
    UserRefetch,
  };
}

export default useIsLogin;
