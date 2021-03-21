import React from "react";
import "./App.scss";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./organisms/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
