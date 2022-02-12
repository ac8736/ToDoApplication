import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Main from "./components/Main";
import AddTask from "./components/AddTask";
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home setAuth={(signedIn) => setIsAuth(signedIn)} />} />
        <Route path="/signin" element={<Signin setAuth={(signedIn) => setIsAuth(signedIn)} />} />
        <Route path="/register" element={<Register setAuth={(signedIn) => setIsAuth(signedIn)} />} />
        <Route path="/main" element={<Main isAuth={isAuth} setAuth={(signedIn) => setIsAuth(signedIn)} />} />
        <Route path="/add" element={<AddTask isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
