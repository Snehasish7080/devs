import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

function ScrollToTop() {
  const history = useHistory();
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unListen();
    };
  }, []);
  return null;
}

export default withRouter(ScrollToTop);
