import React from "react";
import "./scss/App.scss";
import PageRouter from "./components/Router/PageRouter";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
