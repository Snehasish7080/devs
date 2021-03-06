import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Loader from "./atoms/Loader/Loader";
import useIsLogin from "./hooks/useIsLogin";
import RouteConfig from "./RouteConfig";

function Routes() {
  const { User } = useIsLogin();
  const [authToken, setAuthToken] = useLocalStorage("authToken");

  return (
    <Switch>
      {RouteConfig.map(({ isPrivate, ...route }, index) => {
        if (isPrivate) {
          if (authToken) {
            if (User?.data?._id) {
              return <Route {...route} key={index} />;
            } else {
              return <Loader />;
            }
          } else {
            return <Redirect to="/" />;
          }
        } else {
          return <Route {...route} key={index} />;
        }
      })}
    </Switch>
  );
}

export default Routes;
