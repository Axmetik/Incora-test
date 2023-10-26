import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Articles from "./Pages/Articles";
import { useState } from "react";
import Header from "./components/Header";
import Posts from "./Pages/Posts";
import Login from "./Pages/Login";

const isLogged = localStorage.getItem("isLogged");

function App() {
  const [isAuthorized, setIsAuthorized] = useState(
    isLogged || false
  );

  function handleClick() {
    setIsAuthorized(!isAuthorized);
    localStorage.setItem("isLogged", !isAuthorized);
  }

  return (
    <>
      <BrowserRouter>
        <Header
          isAuthorized={isAuthorized}
          handleClick={handleClick}
        />
        <Routes>
          <Route
            path="/nasa"
            element={<Articles url="nasa" />}
          />
          <Route
            path="/reddit"
            element={<Articles url="reddit" />}
          />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/"
            element={<Login handleClick={handleClick} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
