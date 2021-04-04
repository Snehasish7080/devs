import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import useIsLogin from "./hooks/useIsLogin";
import RouteConfig from "./RouteConfig";

function Routes() {
  const { User } = useIsLogin();
  return (
    <Switch>
      {RouteConfig.map(({ isPrivate, ...route }, index) => {
        if (isPrivate) {
          if (User?.data?._id) {
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
