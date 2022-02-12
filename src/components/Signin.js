import "./styles/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";

function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signOn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      props.setAuth(true);
      navigate("/main");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="signin--container">
      <h2>Log In</h2>
      <input type="email" placeholder="Email..." onChange={(event) => setEmail(event.target.value)} value={email} />
      <input type="password" placeholder="Password..." onChange={(event) => setPassword(event.target.value)} value={password} />
      <Link className="register" to="/register">
        Don't have an account? Register here
      </Link>
      <button className="submit" onClick={signOn}>
        Submit
      </button>
    </div>
  );
}

export default Signin;
