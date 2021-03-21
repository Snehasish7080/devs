import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import useIsLogin from "./hooks/useIsLogin";
import RouteConfig from "./RouteConfig";

function Routes() {
  const { authToken } = useIsLogin();
  const history = useHistory();

  return (
    <Switch>
      {RouteConfig.map(({ isPrivate, ...route }, index) => {
        if (isPrivate) {
          if (authToken) {
            return <Route {...route} key={index} />;
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
