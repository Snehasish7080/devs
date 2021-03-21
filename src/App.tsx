import React from "react";
import "./App.scss";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./organisms/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";
import ScrollToTop from "./atoms/ScrollToTop/ScrollToTop";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <ScrollToTop />
          <NavBar />
          <Routes />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
